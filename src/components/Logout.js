import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { updateNotification } from '../reducers/notificationReducer'

const Logout = () => {
  const dispatch = useDispatch()

  const handleLogoutButtonClicked = () => {
    dispatch(logout())
    dispatch(updateNotification('logged out', 3, false))
  }


  return (
    <button id="logout"
      onClick={handleLogoutButtonClicked}>
      logout
    </button>
  )
}

const exported = Logout
export default exported