let app = require('express')()
let http = require('http').createServer(app)
let io = require('socket.io')(http)

app.get('/', function(req, res) {
    res.sendFile('/Users/michaelsiller/Code/practice/express/chat-app/index.html')
})

io.on('connection', function(socket){
    socket.on('chat message', function(msg) {
        io.emit('chat message', msg)
    })
})

http.listen(3030, function(){
    console.log('its 3030')
})