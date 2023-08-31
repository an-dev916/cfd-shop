import cn from 'classnames'
import React from 'react'
import useQuery from '../../hooks/useQuery'
import blogService from '../../services/blogService'

const BlogCates = ({
  catesList,
  onFilterChange,
  setActiveFilter,
  activeFilter
}) => {
  return (
    <div className='widget widget-cats'>
      <div className='header-widget__wrap'>
        <h3 className='widget-title'>Categories</h3>
        <a
          className='sidebar-filter-clear'
          onClick={() => {
            setActiveFilter('')
            onFilterChange('')
          }}
        >
          Clean All
        </a>
      </div>
      <ul>
        {catesList?.length > 0 &&
          catesList?.map((cate, index) => {
            const { id, name, slug } = cate || {}
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { data: cateAmount } = useQuery(() =>
              blogService.getBlogs(`?category=${id}`)
            )
            const { blogs: productsAmount } = cateAmount || {}
            return (
              <li key={id || index}>
                <a
                  onClick={(e) => {
                    e.preventDefault()
                    if (activeFilter !== id) {
                      setActiveFilter(id)
                      onFilterChange(id)
                    }
                  }}
                  href='#'
                  className={cn({ active: activeFilter === id })}
                >
                  {name} <span>{productsAmount?.length || ''}</span>
                </a>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default BlogCates
