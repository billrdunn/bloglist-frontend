import React, { useState } from 'react'

const Blog = ({ blog }) => {

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

  const showFullInfo = () => (
    <div>
      {blog.title}
      <br></br>
      {blog.author}
      <br></br>
      {blog.url}
      <br></br>
      likes: {blog.likes}
      <button>like</button>
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