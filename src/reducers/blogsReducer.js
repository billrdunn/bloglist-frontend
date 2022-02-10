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

    default:
      return state
  }
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

export const initialiseBlogs = () => async (dispatch) => {
  const blogs = await blogsService.getAll()
  dispatch({
    type: 'INIT_BLOGS',
    data: blogs,
  })
}

export const sortBlogs = () => async (dispatch) => {
  dispatch({
    type: 'SORT_BLOGS',
  })
}

export default blogsReducer
