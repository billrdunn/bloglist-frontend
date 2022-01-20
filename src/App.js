import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Logout from './components/Logout'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })
  const [notification, setNotification] = useState({
    message: null,
    isError: false,
  })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      // blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification({ message: `User ${user.username} logged in`, isError: false })
      setTimeout(() => {
        setNotification({
          message: null,
          isError: false,
        })
      }, 5000)
    } catch (exception) {
      setNotification({ message: 'Wrong credentials', isError: true })
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
    setUsername('')
    setPassword('')
    setTimeout(() => {
      setNotification({
        message: null,
        isError: false,
      })
    }, 5000)
  }

  const handleCreateBlog = async () => {
    try {
      blogService.setToken(user.token)
      const blog = await blogService.create(newBlog)
      setNotification({ message: `Blog ${blog.title} added`, isError: false })
      setBlogs({
        title: '',
        author: '',
        url: ''
      })
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

  const handleUsernameChange = (event) => {
    const username = event.target.value
    setUsername(username)
  }

  const handlePasswordChange = (event) => {
    const password = event.target.value
    setPassword(password)
  }

  const handleTitleChange = (event) => {
    const title = event.target.value
    const newBlogObj = {
      title: title,
      author: newBlog.author,
      url: newBlog.url
    }
    setNewBlog(newBlogObj)
  }

  const handleAuthorChange = (event) => {
    const author = event.target.value
    const newBlogObj = {
      title: newBlog.title,
      author: author,
      url: newBlog.url
    }
    setNewBlog(newBlogObj)
  }

  const handleUrlChange = (event) => {
    const url = event.target.value
    const newBlogObj = {
      title: newBlog.title,
      author: newBlog.author,
      url: url
    }
    setNewBlog(newBlogObj)
  }

  const showLoginForm = () => (
    <LoginForm
      onSubmit={handleLogin}
      onUsernameChange={handleUsernameChange}
      onPasswordChange={handlePasswordChange}
      usernameValue={username}
      passwordValue={password}/>
  )

  const showBlogForm = () => (
    <BlogForm
      onSubmit={handleCreateBlog}
      onTitleChange={handleTitleChange}
      onAuthorChange={handleAuthorChange}
      onUrlChange={handleUrlChange}
      titleValue={newBlog.title}
      authorValue={newBlog.value}
      urlValue={newBlog.url}/>
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
      <Notification notification={notification}/>
      {user === null && showLoginForm()}
      {user !== null && showBlogs()}
      {user !== null && showBlogForm()}
      {user !== null && showLogout()}
    </div>
  )
}

export default App