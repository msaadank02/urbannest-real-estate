const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const {mongoose} = require('mongoose')
const path = require('path')
const Chat = require('./models/chatModel')


//database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database connected'))
.catch((err) => console.log('Database connection failed', err))

const app = express();

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

app.use('/', require('./Routes/authRoutes'))
app.use('/', require('./Routes/sellerRoutes'))
app.use('/', require('./Routes/listingsRoute'))
app.use('/', require('./Routes/chatRoutes'))
app.use('/', require('./Routes/messageRoutes'))
app.use('/', require('./Routes/notificationRoutes'))

// ---------------------- Deployment Code ----------------------

// const __dirname1 = path.dirname(__dirname);
// // console.log(__dirname1)
// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static(path.join(__dirname1, '/urbannest-realestate')))

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname1, 'urbannest-realestate', 'index.html'))
//     })
// } else {
//     app.get('/', (req, res) => {
//         res.send('Api running successfully')
//     })
// }

// ---------------------- Deployment Code ^ ----------------------

const port = 8000;
const server = app.listen(port, () => console.log(`Server is running on port ${port}`))



const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});