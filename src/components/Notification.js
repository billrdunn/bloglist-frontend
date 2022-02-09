import React from 'react'
import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(state => state.notification)

  const variant = notification.isError ? 'warning' : 'success'

  if (notification.isVisible) {
    return (
      <div className='container'>
        <Alert id="alert" variant={variant}>{notification.text}</Alert>
      </div>
    )
  }
  else {
    return null
  }

}

export default Notification