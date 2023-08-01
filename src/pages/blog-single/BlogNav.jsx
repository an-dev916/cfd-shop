import React from "react";

const BlogNav = ({ articleData, blogSingleRefetch }) => {
  const prevBlog = () => {
    console.log("articleData :>> ", articleData);
  };
  return (
    <nav className="pager-nav" aria-label="Page navigation">
      <a
        className="pager-link pager-link-prev"
        onClick={prevBlog}
        // href="blog-single.html"
        aria-label="Previous"
        tabIndex={-1}
      >
        {" "}
        Previous Post{" "}
        <span className="pager-link-title">Cras iaculis ultricies nulla</span>
      </a>
      <a
        className="pager-link pager-link-next"
        href="blog-single.html"
        aria-label="Next"
        tabIndex={-1}
      >
        {" "}
        Next Post{" "}
        <span className="pager-link-title">Praesent placerat risus</span>
      </a>
    </nav>
  );
};

export default BlogNav;
