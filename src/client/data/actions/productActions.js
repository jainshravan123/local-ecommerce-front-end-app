import * as types from './actionTypes'
import ProductApi from '../api/ProductApi'

export function loadAllProductsRequest () {
  return { type: types.LOAD_ALL_PRODUCTS_REQUEST, payload: 'LOAD_ALL_PRODUCTS_REQUEST' }
}

export function loadAllProductsSuccess (products) {
  return { type: types.LOAD_ALL_PRODUCTS_SUCCESS, payload: products }
}

export function loadSingleProductsRequest () {
  return { type: types.LOAD_SINGLE_PRODUCTS_REQUEST, payload: 'LOAD_ALL_PRODUCTS_REQUEST' }
}

export function singleProductsSuccess (product) {
  return { type: types.LOAD_SINGLE_PRODUCTS_SUCCESS, payload: product }
}

export function saveProductReqeust () {
  return { type: types.SAVE_PRODUCT_REQUEST, payload: 'SAVE_PRODUCT_REQUEST' }
}

export function resetSaveProductState () {
  return { type: types.RESET_SAVE_PRODUCT_STATE, payload: 'RESET_SAVE_PRODUCT_STATE' }
}

export function saveProductSuccess (product) {
  return { type: types.SAVE_PRODUCT_SUCCESS, payload: product }
}

export function saveProductError (err) {
  return { type: types.SAVE_PRODUCT_ERROR, payload: err }
}

export function updateProductReqeust () {
  return { type: types.UPDATE_PRODUCT_REQUEST, payload: 'UPDATE_PRODUCT_REQUEST' }
}

export function updateProductSuccess (product) {
  return { type: types.UPDATE_PRODUCT_SUCCESS, payload: product }
}

export function uploadImageReqeust () {
  return { type: types.IMAGE_UPLOAD_REQUEST, payload: 'IMAGE_UPLOAD_REQUEST' }
}

export function uploadImageSuccess (product) {
  return { type: types.IMAGE_UPLOAD_SUCCESS, payload: product }
}

export function loadAllProducts () {
  console.log('Coming in loadAllProducts')
  return function (dispatch) {
    dispatch(loadAllProductsRequest())
    return ProductApi.getAllProducts().then((products) => {
      console.log('Products ::', products)
      dispatch(loadAllProductsSuccess(products))
    }).catch((error) => {
      throw error
    })
  }
}

export function fetchSingleProductDetails (productId) {
  return function (dispatch) {
    dispatch(loadSingleProductsRequest())
    return ProductApi.getSingleProducts(productId).then((product) => {
      console.log('Single Product ::', product)
      dispatch(singleProductsSuccess(product))
    }).catch((error) => {
      throw error
    })
  }
}

export function saveProduct (product) {
  console.log('Coming in saveProduct')
  return function (dispatch) {
    dispatch(saveProductReqeust())
    return ProductApi.saveProduct(product).then((doc) => {
      console.log('Save Product Response ::', doc)
      dispatch(saveProductSuccess(doc))
    }).catch((error) => {
      console.log('Save Product Error ::', error)
      throw error
    })
  }
}

export function saveDraft (draftedProduct, history) {
  return function (dispatch) {
    dispatch(saveProductReqeust())
    return ProductApi.saveProduct(draftedProduct).then((doc) => {
      console.log('Save Product Response ::', doc)
      dispatch(saveProductSuccess(doc))
      console.log('doc :: ', doc)
      history.push(`/product/${doc._id}`)
    }).catch((error) => {
      console.log('Save Product Error ::', error)
      throw error
    })
  }
}

export function updateProductDetails (product) {
  console.log('Coming in saveProduct')
  return function (dispatch) {
    dispatch(updateProductReqeust())
    return ProductApi.updateProductDetails(product).then((doc) => {
      console.log('Update Product Response ::', doc)
      dispatch(updateProductSuccess(doc))
    }).catch((error) => {
      console.log('Update Product Error ::', error)
      throw error
    })
  }
}

export function uploadImageForAProduct (productId, imageId, imageData) {
  console.log('Coming into the uploadImageForAProduct action')
  return function (dispatch) {
    dispatch(uploadImageReqeust())
    return ProductApi.uploadFileForAProduct(productId, imageId, imageData).then((doc) => {
      console.log('Upload image Response ::', doc)
      dispatch(uploadImageSuccess(doc))
    }).catch((error) => {
      console.log('Upload Image Error ::', error)
      throw error
    })
  }
}

export function generatingPdf (filter) {
  console.log('Coming in generatingPdf')
  return function (dispatch) {
    return ProductApi.generatingPdf(filter).then((doc) => {
      console.log('Generate PDF Success Response ::', doc)
    }).catch((error) => {
      console.log('Generate PDF Error ::', error)
      throw error
    })
  }
}
