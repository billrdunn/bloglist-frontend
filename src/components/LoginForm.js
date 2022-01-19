import React from 'react'

const LoginForm = ({ onSubmit, onUsernameChange, onPasswordChange, usernameValue, passwordValue }) => {
  return(
    <form onSubmit={onSubmit}>
        username: <input
        value={usernameValue}
        onChange={onUsernameChange} />
      <div>
        password: <input
          type="password"
          value={passwordValue}
          onChange={onPasswordChange} />
      </div>
      <div>
        <button type="submit">login</button>
      </div>
    </form>)
}

const exportedObject = LoginForm
export default exportedObject