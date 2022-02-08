import React from 'react'
import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Notification = () => {

  const state = useSelector(state => state)
  console.log('state:', state)
  const notification = useSelector(state => state.notification)
  console.log('notification :>> ', notification)

  const variant = state.isError ? 'warning' : 'success'

  if (state.isVisible) {
    return (
      <div className='container'>
        <Alert id="alert" variant={variant}>{state.text}</Alert>
      </div>
    )
  }
  else {
    return null
  }

}

export default Notification