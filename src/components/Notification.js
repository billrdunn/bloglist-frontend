import React from 'react'
import { Alert } from 'react-bootstrap'

const Notification = ({ notification }) => {
  if (!notification || !notification.message) {
    return null
  }

  const variant = notification.isError ? 'warning' : 'success'

  return (
    <div className="container">
      <Alert id="alert" variant={variant}>{notification.message}</Alert>
    </div>
  )
}

export default Notification