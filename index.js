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
    let userId = socket.id
    let username = ``
    socket.broadcast.emit('signInOut', `A new user has entered the chat, currently ${population} users`)
    io.emit('username', username)
    io.emit('userId', userId)
    socket.on('username', function(newUsername) {
        username = newUsername
        io.to(`${userId}`).emit('username', username)
    })
    socket.on('chat message', function(msg) {
        io.emit('chat message', username, msg)
    })

    socket.broadcast.on('disconnect', function() {
        population -= 1
        io.emit('signInOut', (population == 1 ? `${username} has left the chat, currently 1 user in the chat` : `${username} has left the chat, currently ${population} users in the chat`))
    })
})

http.listen(3030, function(){
    console.log('its 3030')
})