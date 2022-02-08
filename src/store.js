import notificationReducer from './reducers/notificationReducer'
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { applyMiddleware } from 'redux'

const store = createStore(
  notificationReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store