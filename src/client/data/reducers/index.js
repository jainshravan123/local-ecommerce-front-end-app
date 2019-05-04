import { combineReducers } from 'redux'
import projectReducer from './project-reducer'
import productReducer from './product-reducer'

const allReducers = combineReducers({
  projectReducer: projectReducer,
  productReducer: productReducer
})

export default allReducers
