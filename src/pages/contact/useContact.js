import { useEffect, useState } from "react";
import { PAGE_INFO } from "../../constants/pageInfo";
import useQuery from "../../hooks/useQuery";
import { pagesService } from "../../services/pagesService";

const useContact = () => {
  const {
    data: pageData,
    loading: pageLoading,
    error: pageError,
  } = useQuery(() => pagesService.getPageByName(PAGE_INFO.contact));
  //   const [renderPageData, setRenderPageData] = useState({});
  const pageProps = {
    // renderPageData,
    pageData,
    isLoading: pageLoading,
    isError: pageError,
  };

  //   useEffect(() => {
  //     setRenderPageData(pageData);
  //   }, [JSON.stringify(pageData)]);

  return {
    pageProps,
  };
};

export default useContact;
