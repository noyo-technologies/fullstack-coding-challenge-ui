import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { store } from './redux-store';
import { fetchUsers } from './thunks'
import { App } from './components.jsx'

import "./index.css";


/**
 *
 * App initialization
 *
 */
const rootElement = document.getElementById('root')

store.dispatch(fetchUsers())
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)

