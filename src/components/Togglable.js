import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisability = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisability
    }
  })

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  return (
    <div>
      <div style = {hideWhenVisible}>
        <button onClick={toggleVisability}>{props.buttonLabel}</button>
      </div>
      <div style = {showWhenVisible}>
        {props.children}
        <button onClick={toggleVisability}>cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Toggleable'

const exported = Togglable
export default exported