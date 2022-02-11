import blogsService from '../services/blogs'
import { updateNotification } from './notificationReducer'

const blogsReducer = (state = [], action = {}) => {
  switch (action.type) {
    case 'ADD_BLOG':
      return [...state, action.data]

    case 'INIT_BLOGS':
      return action.data

    case 'SORT_BLOGS':
      return state.sort((first, second) => second.likes - first.likes)

    case 'SET_BLOGS':
      return action.data

    default:
      return state
  }
}
export const sortBlogs = () => async (dispatch) => {
  dispatch({
    type: 'SORT_BLOGS',
  })
}

export const addBlog = (blog) => {
  console.log('addBlog...')
  return async (dispatch) => {
    try {
      // blogFormRef.current.toggleVisability()
      blogsService.setToken(blog.user.token)
      const response = await blogsService.create(blog)
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
      dispatch({
        type: 'SET_BLOGS',
        data: response,
      })
      sortBlogs()
      dispatch(updateNotification(`blog "${blog.title}" liked`, 3, false))
    } catch (exception) {
      dispatch(updateNotification('blog could not be liked', 3, true))
    }
  }
}

export const initialiseBlogs = () => async (dispatch) => {
  const blogs = await blogsService.getAll()
  dispatch({
    type: 'INIT_BLOGS',
    data: blogs,
  })
}


export default blogsReducer
