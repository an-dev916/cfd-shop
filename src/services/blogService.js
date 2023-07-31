import instance from "./axiosInstance";

const blog = {
  blogs: "/blogs",
  cates: "/blog-categories",
  tags: "/blog-tags",
};

const blogService = {
  getBlogs(query = "") {
    return instance.get(`${blog.blogs}${query}`);
  },
  getBlogBySlug(slug = "") {
    return instance.get(`${blog.blogs}${slug ? "/" + slug : ""}`);
  },
  getBlogCates(query = "") {
    return instance.get(`${blog.cates}${query}`);
  },
  getBlogCatesBySlug(slug = "") {
    return instance.get(`${blog.cates}${slug ? "/" + slug : ""}`);
  },
  getBlogTags(query = "") {
    return instance.get(`${blog.tags}${query}`);
  },
  getBlogTagsBySlug(slug = "") {
    return instance.get(`${blog.tags}${slug ? "/" + slug : ""}`);
  },
};

export default blogService;
