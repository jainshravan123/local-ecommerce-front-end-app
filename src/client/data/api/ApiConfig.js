export const getApiHost = () => {
  console.log('process.env.dev :: ', process.env.dev)
  /* if (process.env.dev) {
    return 'localhost:3000'
  } else {
    console.log('Not hosted till the date')
    // process.exit(1)
  } */
  return 'http://localhost:3000'
}
