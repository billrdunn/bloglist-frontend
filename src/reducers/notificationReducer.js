const initialState = { text: '', isVisible: false, isError: false }

let timeoutId = 0

const notificationReducer = (state = initialState, action = {}) => {
  let newState
  switch (action.type) {
    case 'UPDATE_TEXT':
      newState = {
        ...state,
        text: action.data,
      }
      return newState

    case 'SHOW':
      newState = {
        ...state,
        isVisible: true,
      }
      return newState

    case 'HIDE':
      newState = {
        ...state,
        isVisible: false,
      }
      return newState

    case 'SET_ISERROR':
      newState = {
        ...state,
        isError: action.data,
      }
      return newState

    default:
      return state
  }
}

export const updateNotification = (text, timeout, isError) => {
  console.log('updateNotification...')
  return async (dispatch) => {
    clearTimeout(timeoutId)
    dispatch({
      type: 'UPDATE_TEXT',
      data: text,
    })
    dispatch({
      type: 'SHOW',
    })
    dispatch({
      type: 'SET_ISERROR',
      data: isError,
    })
    timeoutId = setTimeout(() => {
      console.log('dispatch HIDE')
      dispatch({
        type: 'HIDE',
      })
    }, timeout * 1000)
  }
}

export default notificationReducer
