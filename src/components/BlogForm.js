import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const handleTitleChange = (event) => {
    const title = event.target.value
    const newBlogObj = {
      title: title,
      author: newBlog.author,
      url: newBlog.url
    }
    setNewBlog(newBlogObj)
  }

  const handleAuthorChange = (event) => {
    const author = event.target.value
    const newBlogObj = {
      title: newBlog.title,
      author: author,
      url: newBlog.url
    }
    setNewBlog(newBlogObj)
  }

  const handleUrlChange = (event) => {
    const url = event.target.value
    const newBlogObj = {
      title: newBlog.title,
      author: newBlog.author,
      url: url
    }
    setNewBlog(newBlogObj)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    })
    setNewBlog({
      title: '',
      author: '',
      url: ''
    })
  }

  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={addBlog}>
        title: <input className='titleInput'
          value={newBlog.title}
          onChange={handleTitleChange} />
        <div>
          author: <input className='authorInput'
            value={newBlog.author}
            onChange={handleAuthorChange} />
        </div>
        <div>
          url: <input className='urlInput'
            value={newBlog.url}
            onChange={handleUrlChange} />
        </div>
        <div>
          <button id='submit-new-blog'
            type="submit">create</button>
        </div>
      </form>
    </div>)
}

const exportedObject = BlogForm
export default exportedObject