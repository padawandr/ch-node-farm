const fs = require('fs')
const http = require('http')

const cardTemplate = fs.readFileSync('./src/templates/card.html', 'utf-8')
const overviewTemplate = fs.readFileSync('./src/templates/overview.html', 'utf-8')
const productTemplate = fs.readFileSync('./src/templates/product.html', 'utf-8')
const data = fs.readFileSync('./src/dev-data/data.json', 'utf-8')
const dataObj = JSON.parse(data)

const server = http.createServer((request, response) => {
  const pathName = request.url
  switch (pathName) {
    case '/': // fall-through
    case '/overview':
      response.writeHead(200, { 'Content-type': 'text/html' })
      const cards = dataObj.map((product) => replaceTemplate(cardTemplate, product)).join('')
      const overviewHTML = overviewTemplate.replace(/{%CARDS%}/g, cards)
      response.end(overviewHTML)
      break
    case '/product':
      response.writeHead(200, { 'Content-type': 'text/html' })
      response.end(product)
      break
    case '/api':
      response.writeHead(200, { 'Content-type': 'application/json' })
      response.end(data)
      break
    default:
      response.writeHead(404, { 'Content-type': 'text/html' })
      response.end('<h1>Page not found!</h1>')
  }
})

server.listen(3333, '127.0.0.1', (err) => {
  if (err) console.log(`server error: ${err}`)
  else console.log('back-end started')
})

function replaceTemplate (template, product) {
  let output = template
  output = output.replace(/{%ID%}/g, product.id)
  output = output.replace(/{%PRODUCTNAME%}/g, product.productName)
  output = output.replace(/{%IMAGE%}/g, product.image)
  output = output.replace(/{%FROM%}/g, product.from)
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients)
  output = output.replace(/{%QUANTITY%}/g, product.quantity)
  output = output.replace(/{%PRICE%}/g, product.price)
  output = product.organic
    ? output.replace(/{%ORGANIC%}/g, '')
    : output.replace(/{%ORGANIC%}/g, 'not-organic')
  output = output.replace(/{%DESCRIPTION%}/g, product.description)
  return output
}
