import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'

function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleUsernameChange = (event) => {
    // const username = event.target.value
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    // const password = event.target.value
    setPassword(event.target.value)
  }

  const addLogin = async (event) => {
    console.log('addLogin...')
    event.preventDefault()
    // const user = {username, password}
    dispatch(login({username, password}))
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>login</h2>
      <Form onSubmit={addLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button variant="primary" type="submit" id="login-button">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

const exportedObject = LoginForm
export default exportedObject
