const fs = require('fs')
const http = require('http')

const data = fs.readFileSync('./src/dev-data/data.json', 'utf-8')

const server = http.createServer((request, response) => {
  const pathName = request.url
  switch (pathName) {
    case '/': // fall-through
    case '/overview':
      response.end('This is the OVERVIEW')
      break
    case '/product':
      response.end('This is the PRODUCT')
      break
    case '/api':
      response.writeHead(200, {
        'Content-type': 'application/json'
      })
      response.end(data)
      break
    default:
      response.writeHead(404, {
        'Content-type': 'text/html',
        'my-own-property': 'hi there'
      })
      response.end('<h1>Page not found!</h1>')
  }
})

server.listen(3333, '127.0.0.1', (err) => {
  if (err) console.log(`server error: ${err}`)
  else console.log('back-end started')
})
