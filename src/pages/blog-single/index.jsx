import React from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'
import { PATHS } from '../../constants/pathnames'
import BlogArticle from './BlogArticle'
import BlogNav from './BlogNav'
import BlogRelated from './BlogRelated'
import './style.css'
import useBlogSingle from './useBlogSingle'

const BlogSingle = () => {
  const { articleBlogProps, blogSingleData, navBlogProps, relatedBlogProps } =
    useBlogSingle()
  return (
    <main className='main'>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={PATHS.BLOG}>Blog</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>{blogSingleData?.name}</Breadcrumb.Item>
      </Breadcrumb>
      <div className='page-content'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <BlogArticle {...articleBlogProps} />
              <BlogNav {...navBlogProps} />
              <BlogRelated {...relatedBlogProps} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default BlogSingle
