import React, { useState } from 'react'
import { Table } from 'react-bootstrap'

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
    <div className='fullBlog'>
      <Table striped>
        <tbody>
          <td>
            <tr>
              <span>{blog.title}</span>
            </tr>
            <tr>
              {blog.author}
            </tr>
            <tr>
              {blog.url}
            </tr>
            <tr>
              likes: {blog.likes}
              <button onClick={addLike}>like</button>
            </tr>
            {showRemoveButton && removeButton()}
            <button onClick={handleClick}> hide </button>
          </td>
          <br></br>
          <br></br>
        </tbody>
      </Table>
    </div>
  )

  const hideFullInfo = () =>
    (
      <div className='reducedBlog'>
        {blog.title} by {blog.author}
        <br></br>
        <button onClick={handleClick}> show info </button>
      </div>
    )

  return (
    <div style={blogStyle} className='blogList'>
      {showFull ? showFullInfo () : hideFullInfo()}
    </div>
  )
}

export default Blog