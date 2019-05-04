import axios from 'axios'

var apiHost = require('./ApiConfig')

class ProductApi {
  static requestHeaders () {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  static getAllProducts () {
    console.log('Coming in getAllProducts')
    console.log('Complete Host :: ', apiHost.getApiHost() + '/admin/api/products')
    const headers = this.requestHeaders()
    console.log('headers ', headers)
    return window.fetch(apiHost.getApiHost() + '/admin/api/products', {
      method: 'GET',
      headers: headers
    }).then(res => res.json())
      .then(
        (result) => {
          console.log('result :: ', result)
          return result
        },
        (error) => {
          console.log('error ', error)
        })
  }

  static getSingleProducts (productId) {
    console.log('Coming in getSingleProducts')
    console.log('Complete Host :: ', apiHost.getApiHost() + '/admin/api/products')
    const headers = this.requestHeaders()
    console.log('headers ', headers)
    return window.fetch(apiHost.getApiHost() + `/admin/api/products/${productId}`, {
      method: 'GET',
      headers: headers
    }).then(res => res.json())
      .then(
        (result) => {
          console.log('result :: ', result)
          return result
        },
        (error) => {
          console.log('error ', error)
        })
  }

  static saveProduct (product) {
    console.log('Coming in save product api')
    const headers = this.requestHeaders()
    return window.fetch(apiHost.getApiHost() + '/admin/api/product', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(product)
    }).then(res => res.json())
      .then(
        (result) => {
          console.log('saveProduct result : ', result)
          return result
        },
        (error) => {
          console.log('saveProduct error : ', error)
          return error
        })
  }

  static uploadFileForAProduct (productId, imageId, imageData) {
    console.log('Coming to the uploadFileForAProduct productId : ', productId)
    console.log('Coming to the uploadFileForAProduct imageId : ', imageId)

    return axios.post(`${apiHost.getApiHost()}/admin/api/products/${productId}/images/${imageId}`, imageData)
      .then(result => {
        console.log('Uploaded the image successfully', result.data)
        return result.data
      })
      .catch(error => {
        console.log('Uploaded the image with failure ::: ', error)
        return error
      })
  }

  static updateProductDetails (product) {
    console.log('Coming in save product api')
    const headers = this.requestHeaders()
    return window.fetch(apiHost.getApiHost() + `/admin/api/products/${product._id}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(product)
    }).then(res => res.json())
      .then(
        (result) => {
          console.log('updateProduct result : ', result)
          return result
        },
        (error) => {
          console.log('updateProduct error : ', error)
          return error
        })
  }

  static generatingPdf (filter) {
    console.log('Coming in generatingPdf api')

    const headers = {'Content-Type': 'application/pdf'}

    let whereClause = {'where': {}}
    whereClause.where['minprice'] = filter.minprice
    whereClause.where['maxprice'] = filter.maxprice
    whereClause.where['filename'] = filter.filename
    let uri = apiHost.getApiHost() + '/admin/api/generatingPdf?filter=' + JSON.stringify(whereClause)

    console.log('URI ::: ', uri)

    return window.fetch(uri, {
      method: 'GET',
      headers: headers
    }).then((res) => {
      return res
    })
      .then(
        (result) => {
          console.log('result :: ', result)
          const filename = filter.filename
          result.blob().then(blob => {
            let url = window.URL.createObjectURL(blob)
            let a = document.createElement('a')
            a.href = url
            a.download = filename
            a.click()
          })
          // return result
        },
        (error) => {
          console.log('error ', error)
        })
  }
}

export default ProductApi
