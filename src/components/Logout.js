import React from 'react'
import { useDispatch } from 'react-redux'
import { updateNotification } from '../reducers/notificationReducer'

const Logout = ({ onClick }) => {
  const dispatch = useDispatch()

  const handleLogoutButtonClicked = () => {
    onClick()
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