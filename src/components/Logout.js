import React from 'react'

const Logout = ({ onClick }) => {
  return (
    <button
      onClick={onClick}>
      logout
    </button>
  )
}

const exported = Logout
export default exported