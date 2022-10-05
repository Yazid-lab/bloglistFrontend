import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [visibleBlog, setVisibleBlog] = useState(false)
  const hide = { display: visibleBlog ? '' : 'none' }
  const buttonLabel = visibleBlog ? 'hide' : 'view'
  return (
    <div>
      <span>{blog.title}</span>
      <span> {blog.author}</span>
      <button onClick={() => setVisibleBlog(!visibleBlog)}>
        {buttonLabel}
      </button>
      <div style={hide}>
        {blog.url}
        <br />
        {blog.likes}
        <button onClick={() => handleLike(blog.id)}>like</button>
        <br />
        <button onClick={() => handleDelete(blog.id, blog.title)}>
          remove
        </button>
      </div>
    </div>
  )
}

export default Blog
