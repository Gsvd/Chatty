const express = require('express')
const app = express()
const faker = require('faker')

const server = app.listen(3000, () => {
    console.log('Server running on port 3000')
})

const io = require('socket.io')(server)

io.on('connection', (socket) => {
  date = new Date()
  hours = ("0" + date.getHours()).slice(-2)
  minutes = ("0" + date.getMinutes()).slice(-2)
  seconds = ("0" + date.getSeconds()).slice(-2)
  firstName = faker.name.firstName()
  socket.emit('WELCOME', {
    user: firstName
  })
  io.emit('MESSAGE', {
    message: `[${ hours }:${ minutes }:${ seconds }] ${ firstName } joined.`
  })
  socket.on('SEND_MESSAGE', (data) => {
    data.message = `[${ hours }:${ minutes }:${ seconds }] ${ data.user }: ${ data.message }`
    io.emit('MESSAGE', data)
  })
})