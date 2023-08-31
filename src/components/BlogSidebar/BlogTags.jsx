const BlogTags = ({ tagsList }) => {
  return (
    <div className='widget'>
      <h3 className='widget-title'>Browse Tags</h3>
      <div className='tagcloud'>
        {tagsList?.length > 0 &&
          tagsList?.map((tag, index) => {
            const { name, id } = tag || {}
            return <a key={id || index}>{name}</a>
          })}
        {/* <a href="#">fashion</a>
        <a href="#">style</a>
        <a href="#">women</a>
        <a href="#">photography</a>
        <a href="#">travel</a>
        <a href="#">shopping</a>
        <a href="#">hobbies</a> */}
      </div>
    </div>
  )
}

export default BlogTags
