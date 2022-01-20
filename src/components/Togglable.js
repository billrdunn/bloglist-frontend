import React, { useState } from 'react'

const Togglable = (props) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisability = () => {
        setVisible(!visible)
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
}

const exported = Togglable
export default exported