import queryString from "query-string";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { PRODUCTS_LIMIT } from "../../constants/productsLimit";
import { SORT_OPTIONS } from "../../constants/sortOptions";
import useQuery from "../../hooks/useQuery";
import { productService } from "../../services/productSevice";

// const PRODUCTS_LIMIT = 6;

export const useProduct = () => {
  // Get Search String (Ex: ?key1=value1&key2=value2...)
  const { search } = useLocation();

  // Convert Search String to Object (Ex: {key1: value1 , key2: value2 , ...})
  const queryObject = queryString.parse(search);
  console.log("search :>> ", search);
  console.log("queryObject :>> ", queryObject);

  // Update Query Search String
  const [_, setSearchParams] = useSearchParams();

  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
    refetch: productsFetch,
  } = useQuery((query) =>
    productService.getProducts(query || `?limit=${PRODUCTS_LIMIT}`)
  );

  const products = productsData?.products || [];
  const productsPagi = productsData?.pagination || {};
  console.log("productsPagi :>> ", productsPagi);

  // Get Categories
  const {
    data: catesData,
    loading: catesLoading,
    error: catesError,
  } = useQuery(productService.getCates);
  const cates = catesData?.products || [];

  // Update Query String
  const updateQueryString = (queryObject) => {
    // Convert Object Search to Search String
    const newQueryString = queryString.stringify({
      ...queryObject,
      limit: PRODUCTS_LIMIT,
    });

    // Update Query Search String
    setSearchParams(new URLSearchParams(newQueryString));
    // setSearchParams("?" + newQueryString);
  };

  // Product List Props
  const productsListProps = {
    products,
    isLoading: productsLoading,
    isError: !!productsError,
  };

  // Pagination Props
  const onPageChange = (page) => {
    updateQueryString({ ...queryObject, page: page });
  };

  const pagiProps = {
    page: productsPagi?.page || 1,
    limit:
      productsPagi?.limit > productsPagi?.total
        ? productsPagi?.total
        : productsPagi?.limit || 0,
    total: productsPagi?.total || 0,
    onPageChange,
  };

  // Filter Props
  const onFilterChange = (cateId) => {
    updateQueryString({ ...queryObject, category: cateId, page: 1 });
  };

  const filterProps = {
    cates: cates || [],
    isLoading: catesLoading,
    isError: catesError,
    activeCate: queryObject.category,
    onFilterChange,
  };

  // Toolbox Props
  const activeSort = useMemo(() => {
    return (
      Object.values(SORT_OPTIONS).find(
        (option) =>
          option?.queryObject?.order === queryObject?.order &&
          option?.queryObject?.orderBy === queryObject?.orderBy
      )?.value || SORT_OPTIONS?.popularity?.value
    );
  }, [queryObject]);

  const onSortChange = (newQueryObject) => {
    updateQueryString({ ...queryObject, ...newQueryObject, page: 1 });
  };

  const toolboxProps = {
    total: productsPagi?.total || 0,
    limit:
      productsPagi?.limit > productsPagi?.total
        ? productsPagi?.total
        : productsPagi?.limit || 0,
    activeSort,
    onSortChange,
  };

  useEffect(() => {
    productsFetch?.(search);
  }, [search, JSON.stringify(products)]);

  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [search]);

  return {
    pagiProps,
    productsListProps,
    filterProps,
    toolboxProps,
  };
};
