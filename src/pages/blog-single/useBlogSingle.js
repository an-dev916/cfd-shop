import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useQuery from '../../hooks/useQuery'
import blogService from '../../services/blogService'

const useBlogSingle = () => {
  const { slug, id } = useParams()
  const {
    data: blogSingleData,
    loading: blogSingleLoading,
    error: blogSingleError,
    refetch: blogSingleRefetch
  } = useQuery(() => blogService.getBlogBySlug(slug), [slug])

  const {
    data: tagsData,
    loading: tagsLoading,
    error: tagsError
  } = useQuery(blogService.getBlogTags)
  const { blogs: tags } = tagsData || {}

  const {
    data: allBlogsData,
    loading: allBlogsLoading,
    error: allBlogsError
  } = useQuery(blogService.getBlogs)
  const { blogs: allBlogs } = allBlogsData || {}

  // Article Props
  const articleBlogProps = {
    articleData: blogSingleData || {},
    isloading: blogSingleLoading,
    isError: blogSingleError,
    allTags: tags
  }

  // Navigation Props
  const [renderNavBlogs, setRenderNavBlogs] = useState({})

  const navBlogProps = {
    articleData: blogSingleData || {},
    renderNavBlogs
  }

  // Blog Related Props
  const [renderRelated, setRenderRelated] = useState([])
  const {
    data: relatedBlogData,
    loading: relatedBlogLoading,
    error: relatedBlogError,
    refetch: relatedBlogRefetch
  } = useQuery(
    () => blogService.getBlogs(`?category=${blogSingleData?.category?.id}`),
    [blogSingleData?.id]
  )

  const relatedBlogProps = { renderRelated }

  useEffect(() => {
    const findBlogIndex = allBlogs?.findIndex(
      (blog) => blog.id === blogSingleData?.id
    )
    if (findBlogIndex > -1) {
      let nextBlog = allBlogs[findBlogIndex + 1]
      let prevBlog = allBlogs[findBlogIndex - 1]

      if (findBlogIndex + 1 >= allBlogs?.length) {
        nextBlog = allBlogs[allBlogs?.length - 1]
      }

      if (findBlogIndex - 1 <= 0) {
        prevBlog = allBlogs[0]
      }

      setRenderNavBlogs({
        nextBlog,
        prevBlog
      })
    }
  }, [JSON.stringify(allBlogs), blogSingleData?.id])

  useEffect(() => {
    if (relatedBlogData?.blogs) {
      const filterRelated = relatedBlogData?.blogs?.filter(
        (item) => item?.id !== blogSingleData?.id
      )

      setRenderRelated(filterRelated)
    }
  }, [JSON.stringify(relatedBlogData), blogSingleData?.id])

  return { articleBlogProps, navBlogProps, blogSingleData, relatedBlogProps }
}

export default useBlogSingle
