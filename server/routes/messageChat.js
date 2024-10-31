// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');
// const mongoose = require('mongoose');  
// const Message = require('../models/Messages')

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "", // Your frontend's origin
//     methods: ["GET", "POST"]
//   }
// });

// io.on('connection', (socket) => {
//   console.log('User connected:', socket.id);

//   // Join user to a private room (based on propertyId and userId)
//   socket.on('joinRoom', ({ propertyId, userId }) => {
//     const roomId = `${propertyId}-${userId}`;
//     socket.join(roomId);
//     console.log(`User ${userId} joined room ${roomId}`);
//   });

//   // Listen for chat messages and store offline messages in the database
//   socket.on('sendMessage', async (messageData) => {
//     const { propertyId, userIdSender, userIdReceiver, message } = messageData;

//     const roomId = `${propertyId}-${userIdReceiver}`;
//     const newMessage = new Message({
//       propertyId,
//       userIdSender,
//       userIdReceiver,
//       message,
//       timestamp: new Date(),
//       isRead: false
//     });

//     await newMessage.save(); // Save the message to the database

//     // Send message to the recipient if they are online
//     io.to(roomId).emit('receiveMessage', newMessage);
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });

 


// module.exports = router;