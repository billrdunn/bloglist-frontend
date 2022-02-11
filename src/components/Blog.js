import { useDispatch, useSelector } from 'react-redux'
import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import { removeBlog, likeBlog } from '../reducers/blogsReducer'

function Blog({ blog, showRemoveButton }) {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const [showFull, setShowFull] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login)


  const handleClick = () => {
    setShowFull(!showFull)
  }

  const handleLikeButtonClicked = () => {
    const newBlogObj = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      key: blog.id,
      user
    }
    dispatch(likeBlog(newBlogObj))
  }

  const handleRemoveButtonClicked = () => {
    const newBlogObj = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      key: blog.id,
      user
    }
    dispatch(removeBlog(newBlogObj))
  }

  const removeButton = () => (
    <button type="submit" onClick={handleRemoveButtonClicked}>
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
      <button type="submit" onClick={handleLikeButtonClicked}>
        like
      </button>
      {showRemoveButton && removeButton()}
      <button type="submit" onClick={handleClick}>
        {' '}
        hide{' '}
      </button>
    </div>
  )

  const hideFullInfo = () => (
    <div className="reducedBlog">
      {blog.title} by {blog.author}
      <br />
      <button type="submit" onClick={handleClick}>
        {' '}
        show info{' '}
      </button>
    </div>
  )

  return (
    <div style={blogStyle} className="blogList">
      {showFull ? showFullInfo() : hideFullInfo()}
    </div>
  )
}

export default Blog
