import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import Routes from './routes.js'
import allRedcuers from './data/reducers'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

const store = createStore(allRedcuers, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>
  , document.getElementById('root'))
