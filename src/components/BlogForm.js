import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBlog } from '../reducers/blogsReducer'

function BlogForm() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login)

  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const handleTitleChange = (event) => {
    const title = event.target.value
    const newBlogObj = {
      title,
      author: newBlog.author,
      url: newBlog.url,
    }
    setNewBlog(newBlogObj)
  }

  const handleAuthorChange = (event) => {
    const author = event.target.value
    const newBlogObj = {
      title: newBlog.title,
      author,
      url: newBlog.url,
    }
    setNewBlog(newBlogObj)
  }

  const handleUrlChange = (event) => {
    const url = event.target.value
    const newBlogObj = {
      title: newBlog.title,
      author: newBlog.author,
      url,
    }
    setNewBlog(newBlogObj)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const blog = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      user,
    }
    setNewBlog({
      title: '',
      author: '',
      url: '',
    })
    dispatch(addBlog(blog))
  }

  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={handleSubmit}>
        title:{' '}
        <input
          className="titleInput"
          value={newBlog.title}
          onChange={handleTitleChange}
        />
        <div>
          author:{' '}
          <input
            className="authorInput"
            value={newBlog.author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:{' '}
          <input className="urlInput" value={newBlog.url} onChange={handleUrlChange} />
        </div>
        <div>
          <button id="submit-new-blog" type="submit">
            create
          </button>
        </div>
      </form>
    </div>
  )
}

const exportedObject = BlogForm
export default exportedObject
