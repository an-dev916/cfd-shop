import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import { PATHS } from '../../constants/pathnames'

const BlogPopular = ({ renderPopularBlogs }) => {
  return (
    <div className='widget'>
      <h3 className='widget-title'>Newest Posts</h3>
      <ul className='posts-list' style={{ height: 386 }}>
        {renderPopularBlogs?.length > 0 &&
          renderPopularBlogs?.map((blog, index) => {
            if (index >= 4) {
              return
            }
            const { id, createdAt, image, slug, name } = blog || {}
            const postedDate = moment(createdAt).format('MMM DD, YYYY')
            return (
              <li key={id || index}>
                <figure>
                  <Link
                    to={`${PATHS.BLOG}${slug ? '/' + slug : ''}`}
                    style={{ height: 80, width: 80 }}
                  >
                    <img src={image || ''} alt='post' />
                  </Link>
                </figure>
                <div>
                  <span>{postedDate || ''}</span>
                  <h4>
                    <Link to={`${PATHS.BLOG}${slug ? '/' + slug : ''}`}>
                      {name || ''}
                    </Link>
                  </h4>
                </div>
              </li>
            )
          })}
        {/* <li>
          <figure>
            <a href="#">
              <img src="/assets/images/blog/sidebar/post-1.jpg" alt="post" />
            </a>
          </figure>
          <div>
            <span>Nov 22, 2018</span>
            <h4>
              <a href="#">Aliquam tincidunt mauris eurisus.</a>
            </h4>
          </div>
        </li>
        <li>
          <figure>
            <a href="#">
              <img src="/assets/images/blog/sidebar/post-2.jpg" alt="post" />
            </a>
          </figure>
          <div>
            <span>Nov 19, 2018</span>
            <h4>
              <a href="#">Cras ornare tristique elit.</a>
            </h4>
          </div>
        </li>
        <li>
          <figure>
            <a href="#">
              <img src="/assets/images/blog/sidebar/post-3.jpg" alt="post" />
            </a>
          </figure>
          <div>
            <span>Nov 12, 2018</span>
            <h4>
              <a href="#">Vivamus vestibulum ntulla nec ante.</a>
            </h4>
          </div>
        </li>
        <li>
          <figure>
            <a href="#">
              <img src="/assets/images/blog/sidebar/post-4.jpg" alt="post" />
            </a>
          </figure>
          <div>
            <span>Nov 25, 2018</span>
            <h4>
              <a href="#">Donec quis dui at dolor tempor interdum.</a>
            </h4>
          </div>
        </li> */}
      </ul>
    </div>
  )
}

export default BlogPopular
