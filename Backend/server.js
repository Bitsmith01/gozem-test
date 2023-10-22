const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const connectToDatabase = require('./db/db');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIo(server); // Attachez Socket.io au serveur HTTP

const port = 5000;

// Connexion à la base de données MongoDB
connectToDatabase();

// Middleware pour analyser les requêtes JSON
app.use(bodyParser.json());

// Cross Fix
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Import des routes
const usersRoutes = require('./routes/userRoute');
app.use('/api/users', usersRoutes);

// Middleware de gestion des erreurs
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

server.listen(port, () => {
  console.log(`Serveur Express listening on port ${port}`);
});

io.on('connection', (socket) => {
  console.log('Client connected to the WebSocket server');

  socket.on('disconnect', () => {
    console.log('Client disconnected from the WebSocket server');
  });

  let messageCount = 0;

  socket.on('message', async (data) => {
    messageCount++;
    // console.log(`Received ${messageCount} 'message' event(s) from the client`);
    // console.log(messageCount);
    io.emit('messageCount', messageCount);

    console.log('Message reçu du client :', JSON.stringify(data));
  });
});



