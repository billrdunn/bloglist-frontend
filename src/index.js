import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

const DEBUG = false
if (!DEBUG) {
  if (!window.console) window.console = {}
  const methods = ['log', 'debug', 'warn', 'info']
  for (let i = 0; i < methods.length; i += 1) {
    console[methods[i]] = function () {}
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
