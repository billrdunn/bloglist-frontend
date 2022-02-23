import blogsService from '../services/blogs'
import { updateNotification } from './notificationReducer'

const blogsReducer = (state = [], action = {}) => {
  // console.log('blogsReducer state now: ', state)
  // console.log('blogsReducer action: ', action)

  switch (action.type) {
    case 'ADD_BLOG':
      return action.data

    case 'INIT_BLOGS':
      return action.data

    case 'SET_BLOGS':
      return action.data

    default:
      return state
  }
}

export const addBlog = (blog) => {
  console.log('addBlog...')
  console.log('blog :>> ', blog);
  return async (dispatch) => {
    try {
      // blogFormRef.current.toggleVisability()
      blogsService.setToken(blog.user.token)
      await blogsService.create(blog)
      const response = await blogsService.getAll()
      dispatch({
        type: 'ADD_BLOG',
        data: response,
      })
      dispatch(updateNotification(`new blog "${blog.title}" added`, 3, false))
    } catch (exception) {
      dispatch(updateNotification('blog could not be added', 3, true))
    }
  }
}

export const removeBlog = (blog) => {
  console.log('removeBlog...')
  return async (dispatch) => {
    try {
      blogsService.setToken(blog.user.token)
      await blogsService.remove(blog)
      const response = await blogsService.getAll()
      response.sort((first, second) => second.likes - first.likes)
      dispatch({
        type: 'SET_BLOGS',
        data: response,
      })
      dispatch(updateNotification(`blog "${blog.title}" removed`, 3, false))
    } catch (exception) {
      dispatch(updateNotification('blog could not be removed', 3, true))
    }
  }
}

export const likeBlog = (blog) => {
  console.log('likeBlog...')
  return async (dispatch) => {
    try {
      blogsService.setToken(blog.user.token)
      await blogsService.update(blog)
      const response = await blogsService.getAll()
      response.sort((first, second) => second.likes - first.likes)
      dispatch({
        type: 'SET_BLOGS',
        data: response,
      })
      dispatch(updateNotification(`blog "${blog.title}" liked`, 3, false))
    } catch (exception) {
      dispatch(updateNotification('blog could not be liked', 3, true))
    }
  }
}

export const initialiseBlogs = () => async (dispatch) => {
  console.log('initialising blogs...')
  const blogs = await blogsService.getAll()
  blogs.sort((first, second) => second.likes - first.likes)
  dispatch({
    type: 'INIT_BLOGS',
    data: blogs,
  })
}

export default blogsReducer
