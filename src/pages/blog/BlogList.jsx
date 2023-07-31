import { Empty, Skeleton } from "antd";
import DOMPurify from "dompurify";
import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/pathnames";
import parse from "html-react-parser";
import moment from "moment/moment";

const BlogList = ({ blogs, blogsLoading, blogsError }) => {
  if (blogsLoading) {
    return (
      <div className="entry-container max-col-2" data-layout="fitRows">
        {new Array(6).fill("").map((_, index) => {
          <div className="entry-item col-sm-6" key={index}>
            <Skeleton active style={{ height: 445 }} />
          </div>;
        })}
      </div>
    );
  }

  if (!blogs?.length) {
    return (
      <div
        className="entry-container max-col-2"
        data-layout="fitRows"
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
        }}
      >
        <Empty />
      </div>
    );
  }
  console.log("blogs :>> ", blogs);
  return (
    <div className="entry-container max-col-2" data-layout="fitRows">
      {blogs?.length > 0 &&
        blogs?.map((blog, index) => {
          const {
            id,
            author,
            createdAt,
            description,
            slug,
            tags,
            image,
            name,
          } = blog || {};

          const cleanHTML = DOMPurify.sanitize(description, {
            USE_PROFILES: { html: true },
          });

          const postedDate = moment(createdAt).format("MMM DD, YYYY");

          return (
            <div className="entry-item col-sm-6" key={id || index}>
              <article className="entry entry-grid">
                <figure className="entry-media">
                  <Link to={PATHS.BLOG_SINGLE} style={{ height: 426 }}>
                    <img src={image} alt={slug} />
                  </Link>
                </figure>
                <div className="entry-body">
                  <div className="entry-meta">
                    <span>{postedDate}</span>
                    <span className="meta-separator">|</span>
                    <span className="entry-author">
                      {" "}
                      by <a href="#">{author || "empty"}</a>
                    </span>
                  </div>
                  <h2 className="entry-title">
                    <Link to={PATHS.BLOG_SINGLE}>{name}</Link>
                  </h2>
                  <div className="entry-content">
                    {parse(cleanHTML)}
                    {/* <p>
                      Sed pretium, ligula sollicitudin laoreet viverra, tortor
                      libero sodales leo, eget blandit nunc tortor eu nibh.
                      Suspendisse potenti. Sed egestas vulputate ...
                    </p> */}
                  </div>
                  <Link to={PATHS.BLOG_SINGLE} className="read-more">
                    Read More
                  </Link>
                </div>
              </article>
            </div>
          );
        })}
    </div>
  );
};

export default BlogList;
