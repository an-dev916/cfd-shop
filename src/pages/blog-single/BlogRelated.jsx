import moment from "moment";
import React from "react";
import OwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/pathnames";

const BlogRelated = ({ renderRelated }) => {
  console.log("renderRelated :>> ", renderRelated);
  if (!renderRelated?.length) {
    return (
      <div className="related-posts">
        <h3 className="title">Related Posts</h3>
        <span>THERE ARE NO RELATED POSTS!</span>
      </div>
    );
  }
  return (
    <div className="related-posts">
      <h3 className="title">Related Posts</h3>
      {/* <div
        className="owl-carousel owl-simple"
        data-toggle="owl"
        data-owl-options='{
                                      "nav": false, 
                                      "dots": true,
                                      "margin": 20,
                                      "loop": false,
                                      "responsive": {
                                          "0": {
                                              "items":1
                                          },
                                          "480": {
                                              "items":2
                                          },
                                          "768": {
                                              "items":3
                                          }
                                      }
                                  }'
      >
        <article className="entry entry-grid">
          <figure className="entry-media">
            <a href="blog-single.html">
              <img
                src="/assets/images/blog/grid/3cols/post-1.jpg"
                alt="image desc"
              />
            </a>
          </figure>
          <div className="entry-body">
            <div className="entry-meta">
              <span>Nov 22, 2018</span>
              <span className="meta-separator">|</span>
              <span className="entry-author">
                {" "}
                by <a href="#">John Doe</a>
              </span>
            </div>
            <h2 className="entry-title">
              <a href="blog-single.html">Cras ornare tristique elit.</a>
            </h2>
          </div>
        </article>
        <article className="entry entry-grid">
          <figure className="entry-media">
            <a href="blog-single.html">
              <img
                src="/assets/images/blog/grid/3cols/post-2.jpg"
                alt="image desc"
              />
            </a>
          </figure>
          <div className="entry-body">
            <div className="entry-meta">
              <span>Nov 22, 2018</span>
              <span className="meta-separator">|</span>
              <span className="entry-author">
                {" "}
                by <a href="#">John Doe</a>
              </span>
            </div>
            <h2 className="entry-title">
              <a href="blog-single.html">Vivamus ntulla necante.</a>
            </h2>
          </div>
        </article>
        <article className="entry entry-grid">
          <figure className="entry-media">
            <a href="blog-single.html">
              <img
                src="/assets/images/blog/grid/3cols/post-3.jpg"
                alt="image desc"
              />
            </a>
          </figure>
          <div className="entry-body">
            <div className="entry-meta">
              <span>Nov 22, 2018</span>
              <span className="meta-separator">|</span>
              <span className="entry-author">
                {" "}
                by <a href="#">John Doe</a>
              </span>
            </div>
            <h2 className="entry-title">
              <a href="blog-single.html">Utaliquam sollicitudin leo.</a>
            </h2>
          </div>
        </article>
        <article className="entry entry-grid">
          <figure className="entry-media">
            <a href="blog-single.html">
              <img
                src="/assets/images/blog/grid/3cols/post-4.jpg"
                alt="image desc"
              />
            </a>
          </figure>
          <div className="entry-body">
            <div className="entry-meta">
              <span>Nov 22, 2018</span>
              <span className="meta-separator">|</span>
              <span className="entry-author">
                {" "}
                by <a href="#">John Doe</a>
              </span>
            </div>
            <h2 className="entry-title">
              <a href="blog-single.html">Fusce pellentesque suscipit.</a>
            </h2>
          </div>
        </article>
      </div> */}
      {renderRelated?.length > 0 && (
        <OwlCarousel
          className="owl-carousel owl-simple"
          nav={false}
          dots={true}
          loop={false}
          margin={20}
          responsive={{
            0: {
              items: 1,
            },
            480: {
              items: 2,
            },
            768: {
              items: 3,
            },
          }}
        >
          {renderRelated?.map((item, index) => {
            const { slug, image, createdAt, author, name, id } = item || {};
            const postedDate = moment(createdAt).format("MMM DD, YYYY");
            return (
              <article className="entry entry-grid" key={id || index}>
                <figure className="entry-media">
                  <Link to={`${PATHS.BLOG}${slug ? "/" + slug : ""}`}>
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
                    <Link to={`${PATHS.BLOG}${slug ? "/" + slug : ""}`}>
                      {name}
                    </Link>
                  </h2>
                </div>
              </article>
            );
          })}
          {/* <article className="entry entry-grid">
          <figure className="entry-media">
            <a href="blog-single.html">
              <img
                src="/assets/images/blog/grid/3cols/post-1.jpg"
                alt="image desc"
              />
            </a>
          </figure>
          <div className="entry-body">
            <div className="entry-meta">
              <span>Nov 22, 2018</span>
              <span className="meta-separator">|</span>
              <span className="entry-author">
                {" "}
                by <a href="#">John Doe</a>
              </span>
            </div>
            <h2 className="entry-title">
              <a href="blog-single.html">Cras ornare tristique elit.</a>
            </h2>
          </div>
        </article>
        <article className="entry entry-grid">
          <figure className="entry-media">
            <a href="blog-single.html">
              <img
                src="/assets/images/blog/grid/3cols/post-2.jpg"
                alt="image desc"
              />
            </a>
          </figure>
          <div className="entry-body">
            <div className="entry-meta">
              <span>Nov 22, 2018</span>
              <span className="meta-separator">|</span>
              <span className="entry-author">
                {" "}
                by <a href="#">John Doe</a>
              </span>
            </div>
            <h2 className="entry-title">
              <a href="blog-single.html">Vivamus ntulla necante.</a>
            </h2>
          </div>
        </article>
        <article className="entry entry-grid">
          <figure className="entry-media">
            <a href="blog-single.html">
              <img
                src="/assets/images/blog/grid/3cols/post-3.jpg"
                alt="image desc"
              />
            </a>
          </figure>
          <div className="entry-body">
            <div className="entry-meta">
              <span>Nov 22, 2018</span>
              <span className="meta-separator">|</span>
              <span className="entry-author">
                {" "}
                by <a href="#">John Doe</a>
              </span>
            </div>
            <h2 className="entry-title">
              <a href="blog-single.html">Utaliquam sollicitudin leo.</a>
            </h2>
          </div>
        </article>
        <article className="entry entry-grid">
          <figure className="entry-media">
            <a href="blog-single.html">
              <img
                src="/assets/images/blog/grid/3cols/post-4.jpg"
                alt="image desc"
              />
            </a>
          </figure>
          <div className="entry-body">
            <div className="entry-meta">
              <span>Nov 22, 2018</span>
              <span className="meta-separator">|</span>
              <span className="entry-author">
                {" "}
                by <a href="#">John Doe</a>
              </span>
            </div>
            <h2 className="entry-title">
              <a href="blog-single.html">Fusce pellentesque suscipit.</a>
            </h2>
          </div>
        </article> */}
        </OwlCarousel>
      )}
    </div>
  );
};

export default BlogRelated;
