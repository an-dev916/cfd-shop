import { useLocation, useSearchParams } from "react-router-dom";
import queryString from "query-string";
import useQuery from "../../hooks/useQuery";
import blogService from "../../services/blogService";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
const BLOGS_LIMIT = 4;
const useBlog = () => {
  // Handle URL Search
  const { search } = useLocation();
  const queryObject = queryString.parse(search);
  console.log("queryObject :>> ", queryObject);
  console.log("search info :>> ", {
    search,
    queryObject,
  });
  const [_, setSearchParams] = useSearchParams();

  // Update Query String
  const updateQueryString = (queryObject) => {
    // Convert Object Search to Search String
    const newQueryString = queryString.stringify({
      ...queryObject,
      limit: BLOGS_LIMIT,
    });
    console.log("newQueryString :>> ", newQueryString);

    // Update Query Search String
    setSearchParams(new URLSearchParams(newQueryString));
    // setSearchParams("?" + newQueryString);
  };

  //   Fetch API
  const {
    data: blogsData,
    loading: blogsLoading,
    error: blogsError,
    refetch: blogsRefetch,
  } = useQuery((query) =>
    blogService.getBlogs(query || `?limit=${BLOGS_LIMIT}`)
  );
  const { blogs, pagination: blogPagi } = blogsData || {};

  const {
    data: catesData,
    loading: catesLoading,
    error: catesError,
  } = useQuery(blogService.getBlogCates);
  const { blogs: catesList } = catesData || {};

  const {
    data: tagsData,
    loading: tagsLoading,
    error: tagsError,
  } = useQuery(blogService.getBlogTags);
  const { blogs: tagsList } = tagsData || {};

  //   Blog List Props
  const blogListProps = { blogsLoading, blogsError, blogs, blogsRefetch };

  // Pagination Props
  const onPageChange = (page) => {
    updateQueryString({ ...queryObject, page: page });
  };

  const pagiProps = {
    total: blogPagi?.total || 0,
    page: blogPagi?.page || 1,
    limit: BLOGS_LIMIT,
    onPageChange,
  };

  //   Cates Props
  const onFilterChange = (cateID) => {
    updateQueryString({ ...queryObject, category: cateID, page: 1 });
  };
  const [activeFilter, setActiveFilter] = useState(queryObject.category);

  const catesProps = {
    setActiveFilter,
    activeFilter,
    onFilterChange,
    catesList,
  };

  //   Search Props
  const [searchBlog, setSearchBlog] = useState(null);
  const debouncedValue = useDebounce(searchBlog, 300);
  console.log("debouncedValue :>> ", debouncedValue);
  const onSearchChange = (value) => {
    updateQueryString({ ...queryObject, page: 1, search: value });
  };

  const searchProps = {
    searchBlog,
    setSearchBlog,
    onSearchChange,
    debouncedValue,
  };

  //   Tags Props
  const filterTagBlogs = () => {
    blogs?.filter((item, index) => item);
  };
  const tagsProps = {
    tagsList,
  };

  useEffect(() => {
    blogsRefetch?.(search);
  }, [JSON.stringify(search)]);

  useEffect(() => {
    if (typeof debouncedValue === "string") {
      onSearchChange?.(debouncedValue);
    }
  }, [debouncedValue]);

  return {
    blogListProps,
    pagiProps,
    catesProps,
    searchProps,
    tagsProps,
  };
};

export default useBlog;
