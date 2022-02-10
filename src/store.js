import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import loginReducer from './reducers/loginReducer'
import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogsReducer,
  login: loginReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
