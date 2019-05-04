import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function productReducer (state = initialState.products, action) {
  switch (action.type) {
    case types.LOAD_ALL_PRODUCTS_REQUEST:
      return Object.assign({}, state, { loading: true })
    case types.LOAD_ALL_PRODUCTS_SUCCESS:
      return Object.assign({}, state, { productList: action.payload, loading: false, singleProduct: undefined })
    case types.LOAD_SINGLE_PRODUCTS_SUCCESS:
      return Object.assign({}, state, { singleProduct: action.payload })
    case types.SAVE_PRODUCT_REQUEST:
      return Object.assign({}, state, { adding: 'started' })
    case types.SAVE_PRODUCT_SUCCESS:
      return Object.assign(({}, state, { adding: 'done', singleProduct: action.payload }))
    case types.UPDATE_PRODUCT_REQUEST:
      return Object.assign({}, state, { saving: 'started' })
    case types.UPDATE_PRODUCT_SUCCESS:
      return Object.assign(({}, state, { saving: 'done', singleProduct: action.payload }))
    case types.IMAGE_UPLOAD_REQUEST:
      return Object.assign({}, state, { imageUploading: 'started' })
    case types.IMAGE_UPLOAD_SUCCESS:
      return Object.assign(({}, state, { imageUploading: 'done', singleProduct: action.payload }))
    case types.RESET_SAVE_PRODUCT_STATE:
      return Object.assign({}, state, { saving: 'none' })
    default:
      return state
  }
}
