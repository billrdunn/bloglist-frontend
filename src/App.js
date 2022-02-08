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
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((first, second) => second.likes - first.likes)
      setBlogs(blogs)
    })
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
      console.log('user after login:>> ', user)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
    } catch (exception) {
      console.log('exeception caught')
    }
  }


  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleCreateBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisability()
      blogService.setToken(user.token)
      await blogService.create(blogObject)

      const newBlogs = await blogService.getAll()
      newBlogs.sort((first, second) => second.likes - first.likes)
      setBlogs(newBlogs)

    } catch (exception) {
      console.log('exception :>> ', exception)
    }
  }

  const handleLikeButtonClicked = async (blogObject) => {
    try {
      blogService.setToken(user.token)
      await blogService.update(blogObject)
      const newBlogs = await blogService.getAll()
      newBlogs.sort((first, second) => second.likes - first.likes)
      setBlogs(newBlogs)
    }
    catch (exception) {
      console.log('exception :>> ', exception)
    }
  }

  const handleRemoveBlog = async (blogObject) => {
    try {
      blogService.setToken(user.token)
      await blogService.remove(blogObject)
      const newBlogs = await blogService.getAll()
      newBlogs.sort((first, second) => second.likes - first.likes)
      setBlogs(newBlogs)
    }
    catch (exception) {
      console.log('exception :>> ', exception)
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
          <Blog
            key={blog.id}
            blog={blog}
            handleLikeButtonClicked={handleLikeButtonClicked}
            handleRemoveBlog={handleRemoveBlog}
            showRemoveButton={user.username === blog.user.username}
          />
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
      <Notification />
      {user === null && showLoginForm()}
      {user !== null && showBlogs()}
      {user !== null && showBlogForm()}
      <br></br>
      {user !== null && showLogout()}
    </div>
  )
}

export default App