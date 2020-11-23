const express = require('express')
const setupProxy = require('./src/setupProxy');
const path = require('path')
const app = express()


// serving react app
app.use(express.static(path.join(__dirname, 'build')))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})


setupProxy(app);



var port = '8080'
if( process.env.FRONTEND_PORT) {
  port = process.env.FRONTEND_PORT;
}

app.listen(port)

