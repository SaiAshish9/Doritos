const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const http=require('http')
const path = require('path')
const Filter = require('bad-words')
const server = http.createServer(app)
const port=process.env.PORT||3000;
var reload = require('reload');
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.json())
app.set('view engine','ejs')
app.use(express.static("public"))
const methodOverride=require("method-override")
app.use(methodOverride("_method"))
const errorHandler=require('./handlers/error')
const authRoutes = require("./routes/auth");

const { generateMessage, generateLocationMessage } = require('./src/utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./src/utils/users')

const socketio = require('socket.io')
const io = socketio(server)

const User=require("./models/User")

const Post=require("./models/posts")

const Event=require("./models/events")



app.use("/", authRoutes);


app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);



  io.on('connection', (socket) => {
    // socket.emit('message', generateMessage('Admin', 'Welcome!'))
    // const query=Chat.find({})
    //   query.sort('-created').limit(10).exec(function(err,docs){
    //       console.log("sending old messages");
    //       socket.emit('load old messages', docs)
    //
    //     })



      console.log('New WebSocket connection')

      socket.on('join', (options, callback) => {
          const { error, user } = addUser({ id: socket.id, ...options })

          if (error) {
              return callback(error)
          }

          socket.join(user.room)
          // socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username} has joined!`))
          io.to(user.room).emit('roomData', {
              room: user.room,
              users: getUsersInRoom(user.room)
          })
          console.log(getUsersInRoom(user.room));

          callback()
      })

      socket.on('sendMessage', (message, callback) => {
          const user = getUser(socket.id)
          const filter = new Filter()

          if (filter.isProfane(message)) {
             socket.emit('message', generateMessage('Admin', 'Profanity is not allowed!'))

              return callback('Profanity is not allowed!')
          }
          //
          // var newMsg=new Chat({name:user.username,msg: message});
          //           console.log(newMsg);
          //           newMsg.save(function(err){
          //             if(err){
          //               console.log(err);
          //             }
          //
          //           })


          io.to(user.room).emit('message', generateMessage(user.username, message))
          callback()
      })

      socket.on('sendLocation', (coords, callback) => {
          const user = getUser(socket.id)
          io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`))

          callback()
      })


      socket.on('disconnect', () => {
          const user = removeUser(socket.id)

          if (user) {
              io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left!`))
              io.to(user.room).emit('roomData', {
                  room: user.room,
                  user:user,
                  users: getUsersInRoom(user.room),
                  response:getUsersInRoom(user.response)
              })
          }
      })
  })



server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})
reload(server, app);
