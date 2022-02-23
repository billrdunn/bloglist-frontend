import loginService from '../services/login'
import blogService from '../services/blogs'
import { updateNotification } from './notificationReducer'

const loginReducer = (state = null, action = {}) => {
  console.log('state now: ', state)
  console.log('action: ', action)

  switch (action.type) {
    case 'LOGIN':
      return action.data

    case 'LOGOUT':
      // state = null
      return null

    case 'INIT_USER':
      return action.user

    default:
      return state
  }
}

export const initialiseUser = () => {
  console.log('initialising user...');
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
    return {
      type: 'INIT_USER',
      user
    }
  }

  return {
    type: 'INIT_USER',
    user: null
  }
}

export const login = (user) => async (dispatch) => {
  try {
    const response = await loginService.login(user)
    console.log('user after login:>> ', response)

    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(response))
    dispatch({
      type: 'LOGIN',
      data: response,
    })
    dispatch(updateNotification(`user ${user.username} logged in`, 3, false))
  } catch (exception) {
    console.log('invalid credentials')
    dispatch(updateNotification('invalid credentials', 3, true))
  }
}

export const logout = () => {
  window.localStorage.removeItem('loggedBlogappUser')
  return async (dispatch) => {
    dispatch({
      type: 'LOGOUT',
    })
  }
}

export default loginReducer
