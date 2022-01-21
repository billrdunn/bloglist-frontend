import React, { useState } from 'react'

const Blog = ({ blog, handleLikeButtonClicked, handleRemoveBlog, showRemoveButton }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
    <button onClick={removeBlog}>remove</button>
  )

  const showFullInfo = () => (
    <div>
      {blog.title}
      <br></br>
      {blog.author}
      <br></br>
      {blog.url}
      <br></br>
      likes: {blog.likes}
      <button onClick={addLike}>like</button>
      <br></br>
      {showRemoveButton && removeButton()}
      <br></br>
      <button onClick={handleClick}> hide </button>
    </div>
  )

  const hideFullInfo = () =>
    (
      <div>
        {blog.title} by {blog.author}
        <br></br>
        <button onClick={handleClick}> show info </button>
      </div>
    )

  return (
    <div style={blogStyle}>
      {showFull ? showFullInfo () : hideFullInfo()}
    </div>
  )
}

export default Blog