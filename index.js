let app = require('express')()
let http = require('http').createServer(app)
let io = require('socket.io')(http)

app.use(require('express').static('public'))

app.get('/', function(req, res) {
    res.sendFile('/Users/michaelsiller/Code/practice/express/chat-app/index.html')
})


let population = 0
io.on('connection', function(socket){
    population += 1
    socket.broadcast.emit('chat message', `New user has entered the chat, currently ${population} users`)
    socket.on('chat message', function(msg) {
        io.emit('chat message', msg)
    })
    socket.broadcast.on('disconnect', function() {
        population -= 1
        io.emit('chat message', `User has left the chat, currently ${population}`)
    })
})

http.listen(3030, function(){
    console.log('its 3030')
})