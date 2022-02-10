import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Logout from './components/Logout'
import blogService from './services/blogs'
import { initialiseBlogs, sortBlogs } from './reducers/blogsReducer'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initialiseBlogs())
    dispatch(sortBlogs())
  }, [dispatch])

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.login)
  const blogFormRef = useRef()

  const handleLikeButtonClicked = async (blogObject) => {
    try {
      blogService.setToken(user.token)
      await blogService.update(blogObject)
      const newBlogs = await blogService.getAll()
      newBlogs.sort((first, second) => second.likes - first.likes)
      // setBlogs(newBlogs)
    } catch (exception) {
      console.log('exception :>> ', exception)
    }
  }

  const handleRemoveBlog = async (blogObject) => {
    try {
      blogService.setToken(user.token)
      await blogService.remove(blogObject)
      const newBlogs = await blogService.getAll()
      newBlogs.sort((first, second) => second.likes - first.likes)
      // setBlogs(newBlogs)
    } catch (exception) {
      console.log('exception :>> ', exception)
    }
  }

  const showLoginForm = () => (
    <Togglable buttonLabel="show login">
      <LoginForm />
    </Togglable>
  )

  const showBlogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  )

  const showBlogs = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLikeButtonClicked={handleLikeButtonClicked}
          handleRemoveBlog={handleRemoveBlog}
          showRemoveButton={user.username === blog.user.username}
        />
      ))}
    </div>
  )

  const showLogout = () => (
    <div>
      <Logout />
    </div>
  )

  return (
    <div>
      <Notification />
      {user === null && showLoginForm()}
      {user !== null && showBlogs()}
      {user !== null && showBlogForm()}
      <br />
      {user !== null && showLogout()}
    </div>
  )
}

export default App
