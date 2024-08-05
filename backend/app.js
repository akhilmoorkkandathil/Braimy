/* eslint-disable no-undef */
const express = require('express');
const http = require('http')
const mongoose = require('mongoose');
const path = require('path')
const dotenv = require('dotenv');
const cors = require('cors');
const socketIo = require('socket.io');



const cookieParser = require('cookie-parser');
const session = require('express-session');

const userRouter = require('./routes/userRoutes');
const tutorRouter = require('./routes/tutorRoutes');
const coordinatorRouter = require('./routes/coordinatorRoutes');
const adminRouter = require('./routes/adminRoutes');


const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static('public'));

const allowedOrigins = [process.env.BASE_URL_CLIENT,'http://127.0.0.1:8081','http://10.20.4.220:8081'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

const users = {}; // Store userID to socketID mappings

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  socket.on('joinRoom', ({ userId, room }) => {
    users[userId] = socket.id;
    socket.join(room);
    console.log(`User ${userId} joined room ${room}`);
  });

  socket.on('chatMessage', ({ room, message, sender }) => {
    io.to(room).emit('message', { message, sender });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
    // Remove user from users object
    for (let userId in users) {
      if (users[userId] === socket.id) {
        delete users[userId];
      }
    }
  });
});

// Initialize and use the session middleware
app.use(session({
    secret: process.env.SECRET_KEY, // Replace with a secret key for session encryption
    resave: true,
    saveUninitialized: true,
}));

// Prevent caching
app.use((req,res,next)=>{
    res.header('Cache-Control','no-cache,private,no-store,must-revalidate');
    res.header('Expires','0');
    res.header('Pragma','no-cache');
    next();
});

// Setup Cookie middleware
app.use((req,res,next)=>{
    res.cookie('myCookie', 'Hello, this is my cookie!', { maxAge: 3600000 });
    next();
});

function connectMongoDB(){
    mongoose.connect(process.env.MONNGO_CONNECTION_STRING)
.then(()=>{
    console.log("Connected to Database!");
})
.catch((error)=>{
    console.log("Mongodb Connection error",error);
})

}


const extractToken = (req, res, next) => {
    const token = req.cookies.user_access_token;
    if (token) {
      req.token = token; // Remove 'Bearer ' from the start
    } else {
      req.token = null;
    }
    next();
  };

app.use(extractToken);

app.use("/images",express.static(path.join('backend/images')))

app.use('/user', userRouter);
app.use('/admin',adminRouter);
app.use('/coordinator',coordinatorRouter);
app.use('/tutor',tutorRouter)




io.on('connection', (socket)=>{
    console.log('socket io connected');
    socket.on('message', (data)=> {
        console.log(data);
        socket.broadcast.emit('received', {data: data, message: 'This is a test message from server'})
    })
})

//Response Handler middleware
app.use((responseObj,req,res)=>{
    const statusCode = responseObj.status || 500;
    const message = responseObj.message || "Something went wrong!";
    return res.status(statusCode).json({
        success: [200,204,201].some(a=> a===statusCode)? true : false,
        status: statusCode,
        message: message,
        data: responseObj.data,
        token: responseObj.token
    });
});
const PORT = 8000;
server.listen(PORT,()=>{
    connectMongoDB();
    console.log(`Server is running on port ${PORT}`);
});