import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Logout from './components/Logout'
import { initialiseBlogs } from './reducers/blogsReducer'
import { initialiseUser } from './reducers/loginReducer'

function App() {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.login)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initialiseUser())
    dispatch(initialiseBlogs())
  }, [dispatch])

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
