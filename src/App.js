import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setUsername('')
      setPassword('')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )
  const newBlogForm = async (event) => {
    event.preventDefault()
    try {
      const blog = { title, author, url }
      const returnedBlog = await blogService.create(blog)
      setTitle('')
      setUrl('')
      setAuthor('')
      setBlogs(blogs.concat(returnedBlog))
      setErrorMessage(`a new blog ${returnedBlog.title} added`)
      event.target.reset()
    } catch ({ response }) {
      setTitle('')
      setUrl('')
      setAuthor('')
      setErrorMessage(response.data.error)
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h2>blogs</h2>
          {user.username} is logged in
          <button onClick={handleLogout}>logout</button>
            <Togglable buttonLabel='New Blog'>
          <form onSubmit={newBlogForm}>
            title{' '}
            <input
              type='text'
              value={title}
              name='title'
              onChange={({ target }) => setTitle(target.value)}
            />{' '}
            <br />
            author{' '}
            <input
              type='text'
              value={author}
              name='author'
              onChange={({ target }) => setAuthor(target.value)}
            />
            <br />
            url{' '}
            <input
              type='text'
              value={url}
              name='url'
              onChange={({ target }) => setUrl(target.value)}
            />
            <br />
            <button type='submit'>create</button>
          </form>
            </Togglable>
          <div>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
