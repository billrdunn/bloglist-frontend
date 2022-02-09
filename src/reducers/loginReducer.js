import loginService from '../services/login'

const loginReducer = (state = null, action) => {
  switch (action.type) {

  case 'LOGIN':
    return action.data

  case 'LOGOUT':
    state = null
    return state

  default:
    return state
  }
}

export const login = (user) => {
  return async dispatch => {
    try {
      const response = await loginService.login(user)
      console.log('user after login:>> ', response)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(response)
      )
      dispatch({
        type: 'LOGIN',
        data: response
      })
    } catch (exception) {
      console.log('exeception caught')
    }
  }
}

export const logout = () => {
  window.localStorage.removeItem('loggedBlogappUser')
  return async dispatch => {
    dispatch({
      type: 'LOGOUT'
    })
  }
}


export default loginReducer