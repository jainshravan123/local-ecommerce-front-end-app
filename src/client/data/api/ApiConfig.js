export const getApiHost = () => {
  console.log('process.env.LOCAL_ECOMMERCE_BACK_ENV_APP_URL :: ', process.env.LOCAL_ECOMMERCE_BACK_ENV_APP_URL)
  /* if (process.env.dev) {
    return 'localhost:3000'
  } else {
    console.log('Not hosted till the date')
    // process.exit(1)
  } */
  // return 'http://localhost:3000'
    return 'https://local-ecommerce-back-end-app.herokuapp.com'
}
