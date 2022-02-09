import blogsService from '../services/blogs'


const blogsReducer = (state = [], action) => {
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

export const add_Blog = (blog) => {
  console.log('addBlog...')
  return async dispatch => {
    try {
      // blogFormRef.current.toggleVisability()
      blogsService.setToken(blog.user.token)
      await blogsService.create(blog)
      dispatch({
        type: 'ADD_BLOG',
        data: blog
      })

    } catch (exception) {
      console.log('exception :>> ', exception)
    }
  }
}

export const initialiseBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const sortBlogs = () => {
  return async dispatch => {
    dispatch({
      type: 'SORT_BLOGS',
    })
  }
}

export default blogsReducer