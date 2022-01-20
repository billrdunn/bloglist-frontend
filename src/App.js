import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Logout from './components/Logout'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({
    message: null,
    isError: false,
  })
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (loginObject) => {
    try {
      const user = await loginService.login(loginObject)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setNotification({ message: `User ${user.username} logged in`, isError: false })
      setTimeout(() => {
        setNotification({
          message: null,
          isError: false,
        })
      }, 5000)
    } catch (exception) {
      setNotification({ message: 'Invalid credentials', isError: true })
      setTimeout(() => {
        setNotification({
          message: null,
          isError: false,
        })
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    console.log('logging out', event.target.value)
    window.localStorage.removeItem('loggedBlogappUser')
    setNotification({ message: `User ${user.username} logged out`, isError: false })
    setUser(null)
    setTimeout(() => {
      setNotification({
        message: null,
        isError: false,
      })
    }, 5000)
  }

  const handleCreateBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisability()
      blogService.setToken(user.token)
      const blog = await blogService.create(blogObject)
      setNotification({ message: `Blog ${blog.title} added`, isError: false })

      const newBlogs = await blogService.getAll()
      setBlogs(newBlogs)

      setTimeout(() => {
        setNotification({
          message: null,
          isError: false,
        })
      }, 5000)
    } catch (exception) {
      setNotification({ message: 'Blog could not be added', isError: true })
      setTimeout(() => {
        setNotification({
          message: null,
          isError: false,
        })
      }, 5000)
    }
  }



  const showLoginForm = () => (
    <Togglable buttonLabel="show login">
      <LoginForm
        createLogin={handleLogin}
      />
    </Togglable>
  )

  const showBlogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm
        createBlog={handleCreateBlog}
      />
    </Togglable>
  )

  const showBlogs = () => {
    return (
      <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  const showLogout = () => {
    return (
      <div>
        <Logout onClick={handleLogout}></Logout>
      </div>
    )
  }

  return (
    <div>
      <Notification notification={notification} />
      {user === null && showLoginForm()}
      {user !== null && showBlogs()}
      {user !== null && showBlogForm()}
      <br></br>
      {user !== null && showLogout()}
    </div>
  )
}

export default App