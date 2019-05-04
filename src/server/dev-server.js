const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')

const config = require('../../webpack.config.js')
const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost'
}

const compiler = webpack(config)
const server = new WebpackDevServer(compiler, options)

server.listen(8080, 'localhost', () => {
  console.log('dev server listening on port 8080')
})
