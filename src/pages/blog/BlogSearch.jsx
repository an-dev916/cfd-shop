import React from 'react'

const BlogSearch = ({ setSearchBlog, onSearchChange, debouncedValue }) => {
  const handleSearch = (e) => {
    e.preventDefault()
    if (typeof debouncedValue === 'string') {
      onSearchChange?.(debouncedValue)
    }
  }
  return (
    <div className='widget widget-search'>
      <h3 className='widget-title'>Search</h3>
      <form onSubmit={handleSearch}>
        <input
          type='text'
          className='form-control'
          placeholder='Search in blog'
          onChange={(e) => setSearchBlog(e.target.value)}
        />
        <button type='submit' className='btn'>
          <i className='icon-search' />
          <span className='sr-only'>Search</span>
        </button>
      </form>
    </div>
  )
}

export default BlogSearch
