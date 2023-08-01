import React from "react";
import AdsBox from "./AdsBox";
import BlogCates from "./BlogCates";
import BlogPopular from "./BlogPopular";
import BlogSearch from "./BlogSearch";
import BlogTags from "./BlogTags";

const BlogSidebar = () => {
  return (
    <aside className="col-lg-3">
      <div className="sidebar">
        <BlogSearch {...searchProps} />
        <BlogCates {...catesProps} />
        <BlogPopular />
        <AdsBox />
        <BlogTags {...tagsProps} />
      </div>
    </aside>
  );
};

export default BlogSidebar;
