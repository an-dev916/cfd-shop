import { message } from "antd";
import { useMemo, useState } from "react";
import HOT_TABS from "../../constants/hotTabs";
import useMutation from "../../hooks/useMutation";
import useQuery from "../../hooks/useQuery";
import { pagesService } from "../../services/pagesService";
import { productService } from "../../services/productSevice";
import { subscribeService } from "../../services/subscribeService";

const useHome = () => {
  // Brands Section
  const {
    data: homeData,
    loading: homeDataLoading,
    error: homeDataError,
  } = useQuery(() => pagesService.getPageByName("home"));
  const brands = homeData?.data?.brands || [];

  const brandsProps = {
    brands,
  };
  // Products List
  const {
    data: productsData,
    loading: productsDataLoading,
    error: productsDataError,
  } = useQuery(productService.getProducts);
  const products = productsData?.products || [];
  // Product Categories
  const {
    data: catesData,
    loading: catesDataLoading,
    error: catesDataError,
  } = useQuery(productService.getCates);
  const cates = catesData?.products || [];

  // Get Deals Section
  const [dealClick, setDealClick] = useState(true);
  const { loading: dealLoading, execute: dealExecute } = useMutation(
    subscribeService.subscribeDeals,
    {
      onSuccess: (data) => {
        message.config({
          top: 60,
        });
        message.success("Subscribe Succesfully!");
      },
      onFail: (error) => {
        console.log("error :>> ", error);
        message.error("Subscribe Failed!");
      },
    }
  );

  const onGetDeals = (email) => {
    if (email) {
      dealExecute({
        email: email,
      });
    }
  };

  const getDealsProps = {
    onGetDeals,
    setDealClick,
    dealClick,
  };

  // Hot Products Section
  const [selectedHotTab, setSelectedHotTab] = useState(HOT_TABS.featured);
  const hotProductProps = useMemo(() => {
    let hotProducts = [];

    switch (selectedHotTab) {
      case HOT_TABS.featured:
        hotProducts = products?.filter((el) => el.featured);
        break;

      case HOT_TABS.onSale:
        hotProducts = products?.filter((el) => el.onSale);
        break;

      case HOT_TABS.topRated:
        hotProducts = products?.filter((el) => el.topRated);
        break;

      default:
        hotProducts = [];
        break;
    }
    return {
      hotProducts,
      selectedHotTab,
      onSelectHotTab: setSelectedHotTab,
    };
  }, [products, selectedHotTab]);

  // Featured Section
  const [selectedCateSlug, setSelectedCateSlug] = useState("all");
  const featuredProps = useMemo(() => {
    const featuredProducts =
      selectedCateSlug === "all"
        ? [...(products || [])]
        : products?.filter(
            (product) => product?.category?.slug === selectedCateSlug
          );
    return {
      categories: [{ name: "All", slug: "all" }, ...cates],
      featuredProducts,
      selectedCateSlug,
      onSelectedCateSlug: (slug) => setSelectedCateSlug(slug),
    };
  }, [selectedCateSlug, products, cates, setSelectedCateSlug]);

  // Services Section
  const ourServices = homeData?.data?.information || {};
  console.log("ourServices :>> ", ourServices);
  const servicesProps = {
    ourServices,
  };

  return {
    brands,
    products,
    hotProductProps,
    featuredProps,
    getDealsProps,
    brandsProps,
    servicesProps,
  };
};

export default useHome;
