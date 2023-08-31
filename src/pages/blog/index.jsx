import React from 'react'
import BlogList from './BlogList'
import useBlog from './useBlog'
import './style.css'
import Pagination from '../../components/Pagination'
import { PATHS } from '../../constants/pathnames'
import Breadcrumb from '../../components/Breadcrumb'
import { Link } from 'react-router-dom'
import BlogSearch from './BlogSearch'
import BlogCates from './BlogCates'
import BlogPopular from './BlogPopular'
import AdsBox from './AdsBox'
import BlogTags from './BlogTags'

const Blog = () => {
  const {
    blogListProps,
    pagiProps,
    catesProps,
    searchProps,
    tagsProps,
    popularProps,
    renderBlogsByTag
  } = useBlog()

  return (
    <main className='main'>
      <div
        className='page-header text-center'
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className='container'>
          <h1 className='page-title'>Blog</h1>
        </div>
      </div>
      <Breadcrumb className='border-0 mb-0'>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>Blog</Breadcrumb.Item>
      </Breadcrumb>
      <div className='page-content'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-9'>
              {/* <div className="entry-container max-col-2" data-layout="fitRows">
                <div className="entry-item col-sm-6">
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
                        <a href="blog-single.html">
                          Cras ornare tristique elit.
                        </a>
                      </h2>
                      <div className="entry-content">
                        <p>
                          Sed pretium, ligula sollicitudin laoreet viverra,
                          tortor libero sodales leo, eget blandit nunc tortor eu
                          nibh. Suspendisse potenti. Sed egestas vulputate ...
                        </p>
                        <a href="blog-single.html" className="read-more">
                          Read More
                        </a>
                      </div>
                    </div>
                  </article>
                </div>
                <div className="entry-item col-sm-6">
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
                        <a href="blog-single.html">
                          Vivamus vestibulum ntulla necante.
                        </a>
                      </h2>
                      <div className="entry-content">
                        <p>
                          Morbi purus libero, faucibus commodo quis, gravida id,
                          est. Vestibulumvolutpat, lacus a ultrices sagittis, mi
                          neque euismod dui ...
                        </p>
                        <a href="blog-single.html" className="read-more">
                          Read More
                        </a>
                      </div>
                    </div>
                  </article>
                </div>
                <div className="entry-item col-sm-6">
                  <article className="entry entry-grid">
                    <figure className="entry-media">
                      <a href="blog-single.html">
                        <img
                          src="/assets/images/blog/grid/3cols/post-5.jpg"
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
                        <a href="blog-single.html">
                          Aenean dignissim pellente squefelis.
                        </a>
                      </h2>
                      <div className="entry-content">
                        <p>
                          Aliquam erat volutpat. Nam dui mi, tincidunt quis,
                          accumsan porttitor, facilisis luctus, metus. Phasellus
                          ultrices nulla quis nibh. Quisque lectus ...{" "}
                        </p>
                        <a href="blog-single.html" className="read-more">
                          Read More
                        </a>
                      </div>
                    </div>
                  </article>
                </div>
                <div className="entry-item col-sm-6">
                  <article className="entry entry-grid">
                    <figure className="entry-media">
                      <a href="blog-single.html">
                        <img
                          src="/assets/images/blog/grid/3cols/post-6.jpg"
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
                        <a href="blog-single.html">
                          Quisque volutpat mattiseros.
                        </a>
                      </h2>
                      <div className="entry-content">
                        <p>
                          Nam dui mi, tincidunt quis, accumsan porttitor,
                          facilisis luctus, metus. Phasellus ultrices nulla quis
                          nibh. Quisque lectus. Donec consectetuer ...{" "}
                        </p>
                        <a href="blog-single.html" className="read-more">
                          Read More
                        </a>
                      </div>
                    </div>
                  </article>
                </div>
                <div className="entry-item col-sm-6">
                  <article className="entry entry-grid">
                    <figure className="entry-media">
                      <a href="blog-single.html">
                        <img
                          src="/assets/images/blog/grid/3cols/post-7.jpg"
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
                        <a href="blog-single.html">
                          Utaliquam sollicitudin leo.
                        </a>
                      </h2>
                      <div className="entry-content">
                        <p>
                          Praesent dapibus, neque id cursus faucibus, tortor
                          neque egestas auguae, eu vulputate magna eros eu erat.
                          Aliquam erat volutpat ...{" "}
                        </p>
                        <a href="blog-single.html" className="read-more">
                          Read More
                        </a>
                      </div>
                    </div>
                  </article>
                </div>
                <div className="entry-item col-sm-6">
                  <article className="entry entry-grid">
                    <figure className="entry-media">
                      <a href="blog-single.html">
                        <img
                          src="/assets/images/blog/grid/3cols/post-8.jpg"
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
                        <a href="blog-single.html">Quisque a lectus. </a>
                      </h2>
                      <div className="entry-content">
                        <p>
                          Aliquam erat volutpat. Nam dui mi, tincidunt quis,
                          accumsan porttitor, facilisis luctus, metus. Phasellus
                          ultrices nulla quis nibh. Quisque lectus ...{" "}
                        </p>
                        <a href="blog-single.html" className="read-more">
                          Read More
                        </a>
                      </div>
                    </div>
                  </article>
                </div>
              </div> */}
              <BlogList {...blogListProps} />
              {renderBlogsByTag?.length > 0 || <Pagination {...pagiProps} />}
              {/* <nav aria-label="Page navigation">
                <ul className="pagination">
                  <li className="page-item disabled">
                    <a
                      className="page-link page-link-prev"
                      href="#"
                      aria-label="Previous"
                      tabIndex={-1}
                      aria-disabled="true"
                    >
                      <span aria-hidden="true">
                        <i className="icon-long-arrow-left" />
                      </span>
                      Prev{" "}
                    </a>
                  </li>
                  <li className="page-item active" aria-current="page">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link page-link-next"
                      href="#"
                      aria-label="Next"
                    >
                      {" "}
                      Next{" "}
                      <span aria-hidden="true">
                        <i className="icon-long-arrow-right" />
                      </span>
                    </a>
                  </li>
                </ul>
              </nav> */}
            </div>
            <aside className='col-lg-3'>
              <div className='sidebar'>
                <BlogSearch {...searchProps} />
                <BlogCates {...catesProps} />
                <BlogPopular {...popularProps} />
                <AdsBox />
                <BlogTags {...tagsProps} />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Blog
