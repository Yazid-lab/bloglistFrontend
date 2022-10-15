import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [visibleBlog, setVisibleBlog] = useState(false)
  const hide = { display: visibleBlog ? '' : 'none' }
  const buttonLabel = visibleBlog ? 'hide' : 'view'
  return (
    <li>
      <div className='visibleDetails'>
        <span>{blog.title}</span>
        <span> {blog.author}</span>
        <button id='toggle-visibility' onClick={() => setVisibleBlog(!visibleBlog)}>
          {buttonLabel}
        </button>
      </div>
      <div className='hiddenDetails' style={hide}>
        <ul>
          <li>{blog.url}</li>
          <li>{blog.likes}</li>
          <button id='like-button' onClick={() => handleLike(blog.id)}>
            like
          </button>
          <br />
          <button
            id='deleteButton'
            onClick={() => handleDelete(blog.id, blog.title)}
          >
            remove
          </button>
        </ul>
      </div>
    </li>
  )
}

export default Blog
