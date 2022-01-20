import React, { useState, useImperativeHandle } from 'react'

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

const exported = Togglable
export default exported