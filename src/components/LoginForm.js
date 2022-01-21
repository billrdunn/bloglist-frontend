import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ createLogin }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => {
    const username = event.target.value
    setUsername(username)
  }

  const handlePasswordChange = (event) => {
    const password = event.target.value
    setPassword(password)
  }

  const addLogin = (event) => {
    event.preventDefault()
    createLogin({
      username: username,
      password: password
    })
    setUsername('')
    setPassword('')
  }

  LoginForm.propTypes = {
    createLogin: PropTypes.func.isRequired
  }

  return (
    <form onSubmit={addLogin}>
      username: <input
        value={username}
        onChange={handleUsernameChange} />
      <div>
        password: <input
          type="password"
          value={password}
          onChange={handlePasswordChange} />
      </div>
      <div>
        <button type="submit">login</button>
      </div>
    </form>)
}


const exportedObject = LoginForm
export default exportedObject