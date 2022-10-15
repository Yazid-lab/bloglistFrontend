import { useState, useEffect, useLayoutEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const handleLogin = async (submittedUser) => {
    try {
      const user = await loginService.login(submittedUser)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }
  const newBlogForm = async (blogToAdd) => {
    try {
      const returnedBlog = await blogService.create(blogToAdd)
      setBlogs(blogs.concat(returnedBlog))
      setErrorMessage(`a new blog ${returnedBlog.title} added`)
    } catch ({ response }) {
      setErrorMessage(response.data.error)
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }
  const likeBlog = async (id) => {
    const blogToLike = blogs.find((blog) => blog.id === id)
    if (!blogToLike) {
      setErrorMessage("can't find this blog ")
    } else {
      const updatedBlog = {
        ...blogToLike,
        likes: blogToLike.likes + 1,
        user: blogToLike.user.id,
      }
      try {
        const returnedBlog = await blogService.update(id, updatedBlog)
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)))
      } catch (error) {
        setErrorMessage('error happened ahhhh')
      }
    }
  }
  const deleteBlog = async (id, title) => {
    const deleteConfirmation = window.confirm(`do you wanna delete ${title}`)
    if (!deleteConfirmation) {
      return
    }
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
    } catch (error) {
      setErrorMessage('error while deleting ahhhh')
    }
  }
  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ? (
        <LoginForm handleSubmit={handleLogin}/>
      ) : (
        <div>
          <h2>blogs</h2>
          {user.name} is logged in
          <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel='New Blog'>
            <BlogForm createBlog={newBlogForm} />
          </Togglable>
          <ul>
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleLike={likeBlog}
                handleDelete={deleteBlog}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App
