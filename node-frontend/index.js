const express = require('express')
const proxy = require('express-http-proxy')
const path = require('path')
const app = express()


// serving react app
app.use(express.static(path.join(__dirname, 'build')))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

// gateway post to local quarkus
var backend_quarkus_host = 'localhost';
var backend_quarkus_port = '8080';

if( process.env.COMPONENT_QUARKUS_BACKEND_HOST){
  backend_quarkus_host = process.env.COMPONENT_QUARKUS_BACKEND_HOST;
}

if( process.env.COMPONENT_QUARKUS_BACKEND_PORT){
  backend_quarkus_port = process.env.COMPONENT_QUARKUS_BACKEND_PORT;
}

app.use('/quarkus', proxy(backend_quarkus_host + ':' + backend_quarkus_port));

var port = '8080'
if( process.env.FRONTEND_PORT) {
  port = process.env.FRONTEND_PORT;
}

app.listen(port)

