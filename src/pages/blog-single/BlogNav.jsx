import { message } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/pathnames";

const BlogNav = ({ articleData, renderNavBlogs }) => {
  const presentBlogID = articleData?.id;
  const { nextBlog, prevBlog } = renderNavBlogs || {};
  message.config({ top: 62 });
  return (
    <nav className="pager-nav" aria-label="Page navigation">
      {presentBlogID === prevBlog?.id ? (
        <a
          className="pager-link pager-link-prev"
          onClick={() => message.info("There is no previous post!")}
          // aria-label="Previous"
          // tabIndex={-1}
        >
          {" "}
          Previous Post{" "}
          <span className="pager-link-title">There is no previous post!</span>
        </a>
      ) : (
        <Link
          className="pager-link pager-link-prev"
          to={`${PATHS.BLOG}${prevBlog?.slug ? "/" + prevBlog?.slug : ""}`}
          // aria-label="Previous"
          // tabIndex={-1}
        >
          {" "}
          Previous Post{" "}
          <span className="pager-link-title">{prevBlog?.name}</span>
        </Link>
      )}
      {presentBlogID === nextBlog?.id ? (
        <a
          className="pager-link pager-link-next"
          onClick={() => message.info("This is the newest post!")}
          // aria-label="Next"
          // tabIndex={-1}
        >
          {" "}
          Next Post{" "}
          <span className="pager-link-title">This is the newest post!</span>
        </a>
      ) : (
        <Link
          className="pager-link pager-link-next"
          to={`${PATHS.BLOG}${nextBlog?.slug ? "/" + nextBlog?.slug : ""}`}
          // aria-label="Next"
          // tabIndex={-1}
        >
          {" "}
          Next Post <span className="pager-link-title">{nextBlog?.name}</span>
        </Link>
      )}
    </nav>
  );
};

export default BlogNav;
