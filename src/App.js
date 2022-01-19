import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
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

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password
      })
      console.log('user :>> ', user)
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

  const handleUsernameChange = (event) => {
    const username = event.target.value
    console.log('username :>> ', username)
    setUsername(username)
  }

  const handlePasswordChange = (event) => {
    const password = event.target.value
    console.log('password :>> ', password)
    setPassword(password)
  }

  const showLoginForm = () => (
    <LoginForm
      onSubmit={handleLogin}
      onUsernameChange={handleUsernameChange}
      onPasswordChange={handlePasswordChange}
      usernameValue={username}
      passwordValue={password}/>
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

  return (
    <div>
      <Notification notification={notification}/>
      {user === null && showLoginForm()}
      {user !== null && showBlogs()}
    </div>
  )
}

export default App