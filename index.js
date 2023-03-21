'use strict'

// swagger
const swaggerUi = require('swagger-ui-express')
const yaml = require('yamljs')
const path = require('path')
const swaggerdoc = yaml.load(path.join(__dirname, 'swaggerdoc.yaml'))

const express = require('express')
const app = express()

// parse various different custom JSON types as JSON

const port = 3001

const swaggerUiOptions = {
  explorer: false
}

const mountRoutes = require('./routes')
mountRoutes(app)
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerdoc, swaggerUiOptions))

app.listen(port, function () {
  // eslint-disable-next-line no-console
  console.log('App listening on port ' + port + '!')
})
