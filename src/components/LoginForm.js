import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'react-bootstrap'

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
    <div>
      <h2>login</h2>
      <Form onSubmit={addLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control type="text" id="username" value={username} onChange={handleUsernameChange} />
          <Form.Label>password:</Form.Label>
          <Form.Control type="password" id="password" value={password} onChange={handlePasswordChange} />
          <Button variant="primary" type="submit" id='login-button' >
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

const exportedObject = LoginForm
export default exportedObject