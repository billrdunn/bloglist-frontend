import React, { useState } from 'react'
import { Table } from 'react-bootstrap'

function Blog({ blog, handleLikeButtonClicked, handleRemoveBlog, showRemoveButton }) {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [showFull, setShowFull] = useState(false)

  const handleClick = () => {
    setShowFull(!showFull)
  }

  const addLike = () => {
    const newBlogObj = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      key: blog.id,
    }
    handleLikeButtonClicked(newBlogObj)
  }

  const removeBlog = () => {
    const newBlogObj = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      key: blog.id,
    }
    handleRemoveBlog(newBlogObj)
  }

  const removeButton = () => (
    <button type="submit" onClick={removeBlog}>
      remove
    </button>
  )

  const showFullInfo = () => (
    <div className="fullBlog">
      <Table striped>
        <tbody>
          <tr>
            <td>{blog.title}</td>
          </tr>
          <tr>
            <td>{blog.author}</td>
          </tr>
          <tr>
            <td>{blog.url}</td>
          </tr>
          <tr>
            <td>likes: {blog.likes}</td>
          </tr>
        </tbody>
      </Table>
      <button type="submit" onClick={addLike}>like</button>
      {showRemoveButton && removeButton()}
      <button type="submit" onClick={handleClick}> hide </button>
    </div>
  )

  const hideFullInfo = () => (
    <div className="reducedBlog">
      {blog.title} by {blog.author}
      <br />
      <button type="submit" onClick={handleClick}> show info </button>
    </div>
  )

  return (
    <div style={blogStyle} className="blogList">
      {showFull ? showFullInfo() : hideFullInfo()}
    </div>
  )
}

export default Blog
