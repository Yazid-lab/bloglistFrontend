const { useState } = require('react')

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const newBlogForm = (event) => {
    event.preventDefault()
    try {
      const blog = { title, author, url }
      createBlog(blog)
      setTitle('')
      setUrl('')
      setAuthor('')
      event.target.reset()
    } catch ({ response }) {
      setTitle('')
      setUrl('')
      setAuthor('')
    }
  }
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = ({ target }) => {
    setAuthor(target.value)
  }
  const handleUrlChange = ({ target }) => {
    setUrl(target.value)
  }
  return (
    <form onSubmit={newBlogForm}>
      title
      <input
        placeholder='type title'
        type='text'
        value={title}
        name='title'
        onChange={handleTitleChange}
      />
      <br />
      author{' '}
      <input
        placeholder='type author'
        type='text'
        value={author}
        name='author'
        onChange={handleAuthorChange}
      />
      <br />
      url{' '}
      <input
        placeholder='type url'
        type='text'
        value={url}
        name='url'
        onChange={handleUrlChange}
      />
      <br />
      <button type='submit'>create</button>
    </form>
  )
}
export default BlogForm
