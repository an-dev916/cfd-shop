import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useQuery from "../../hooks/useQuery";
import blogService from "../../services/blogService";

const useBlogSingle = () => {
  const { slug } = useParams();
  const {
    data: blogSingleData,
    loading: blogSingleLoading,
    error: blogSingleError,
    refetch: blogSingleRefetch,
  } = useQuery(() => blogService.getBlogBySlug(slug));
  console.log("blogSingleData :>> ", blogSingleData);

  const {
    data: tagsData,
    loading: tagsLoading,
    error: tagsError,
  } = useQuery(blogService.getBlogTags);
  const { blogs: tags } = tagsData || {};

  // Article Props
  const articleBlogProps = {
    articleData: blogSingleData || {},
    isloading: blogSingleLoading,
    isError: blogSingleError,
    allTags: tags,
  };

  // Navigation Props
  const navBlogProps = {
    articleData: blogSingleData || {},
    blogSingleRefetch,
  };

  // Blog Related Props
  const [renderRelated, setRenderRelated] = useState([]);
  // const [navBlog, setNavBlog] = useState({})
  const {
    data: relatedBlogData,
    loading: relatedBlogLoading,
    error: relatedBlogError,
    refetch: relatedBlogRefetch,
  } = useQuery(
    () => blogService.getBlogs(`?category=${blogSingleData?.category?.id}`),
    [blogSingleData?.id]
  );

  console.log("relatedBlogData :>> ", relatedBlogData);

  const relatedBlogProps = { renderRelated };

  useEffect(() => {
    blogSingleRefetch?.(slug);
  }, [slug]);

  useEffect(() => {
    if (relatedBlogData?.blogs) {
      const filterRelated = relatedBlogData?.blogs?.filter(
        (item) => item?.id !== blogSingleData?.id
      );

      setRenderRelated(filterRelated);
    }
  }, [JSON.stringify(relatedBlogData), blogSingleData?.id]);

  return { articleBlogProps, navBlogProps, blogSingleData, relatedBlogProps };
};

export default useBlogSingle;
