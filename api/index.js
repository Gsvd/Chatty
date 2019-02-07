const express = require('express')
const app = express()

const server = app.listen(3000, function() {
    console.log('server running on port 3000')
})

const io = require('socket.io')(server)
const faker = require('faker')

io.on('connection', function(socket) {
  firstName = faker.name.firstName()
  socket.emit('WELCOME', {
    user: firstName
  })
  io.emit('MESSAGE', {
    message: `${ firstName } joined.`
  })
  socket.on('SEND_MESSAGE', function(data) {
    data.message = `${ data.user }: ${ data.message }`
    io.emit('MESSAGE', data)
  })
})