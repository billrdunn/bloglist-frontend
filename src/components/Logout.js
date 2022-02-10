import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { updateNotification } from '../reducers/notificationReducer'

function Logout() {
  const dispatch = useDispatch()

  const handleLogoutButtonClicked = () => {
    dispatch(logout())
    dispatch(updateNotification('logged out', 3, false))
  }

  return (
    <button type="submit" id="logout" onClick={handleLogoutButtonClicked}>
      logout
    </button>
  )
}

const exported = Logout
export default exported
