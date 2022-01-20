import React from 'react'

const BlogForm = ({ onSubmit, onTitleChange, onAuthorChange, onUrlChange, titleValue, authorValue, urlValue }) => {
    return (
        <div>
            <h2>create new blog</h2>
            <form onSubmit={onSubmit}>
                title: <input
                    value={titleValue}
                    onChange={onTitleChange} />
                <div>
                    author: <input
                        value={authorValue}
                        onChange={onAuthorChange} />
                </div>
                <div>
                    url: <input
                        value={urlValue}
                        onChange={onUrlChange} />
                </div>
                <div>
                    <button type="submit">create</button>
                </div>
            </form>
        </div>)
}

const exportedObject = BlogForm
export default exportedObject