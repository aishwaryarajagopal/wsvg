var express = require('express')
var app = express();

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.sendfile('bootstrap/index.html')
})

app.get('/path.js', function(request, response) {
  response.sendfile('bootstrap/path.js')
})

app.get('/scatter.js', function(request, response) {
  response.sendfile('bootstrap/scatter.js')
})

app.get('/testResponse.json', function(request, response) {
  response.sendfile('testResponse.json')
})

/*
app.get('/css/bootstrap.min.css', function(request, response) {
  response.sendfile('bootstrap/css/bootstrap.min.css')
})

app.get('/js/ie-emulation-modes-warning.js', function(request, response) {
  response.sendfile('bootstrap/js/ie-emulation-modes-warning.js')
})

app.get('/js/bootstrap.min.js', function(request, response) {
  response.sendfile('bootstrap/js/bootstrap.min.js')
})

app.get('/js/ie10-viewport-bug-workaround.js', function(request, response) {
  response.sendfile('bootstrap/js/ie10-viewport-bug-workaround.js')
})

app.get('/testData.json', function(request, response) {
  response.sendfile('bootstrap/testData.json')
})*/

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
