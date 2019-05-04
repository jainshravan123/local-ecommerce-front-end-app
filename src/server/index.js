let express = require('express')
let path = require('path')
let app = express()

let PORT = process.env.PORT || 8080

app.use(express.static(path.resolve(__dirname, './../../')))

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, './../../', 'index.html'))
})

app.listen(PORT, function (err, res) {
  if (err) {
    console.log('Error occurred while Starting the App', err)
  } else {
    console.log('App is listening at PORT : ' + PORT)
  }
})
