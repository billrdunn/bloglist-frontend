import React from 'react'
import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

function Notification() {
  const notification = useSelector((state) => state.notification)

  const variant = notification.isError ? 'warning' : 'success'

  if (notification.isVisible) {
    return (
      <div className="container">
        <Alert id="alert" variant={variant}>
          {notification.text}
        </Alert>
      </div>
    )
  }
  return null
}

export default Notification
