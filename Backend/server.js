const express = require('express');
const bodyParser = require('body-parser');
const connectToDatabase = require('./db/db')
const mongoose = require('mongoose');
const app = express();
const port = 5000;

// Connexion à la base de données MongoDB
connectToDatabase();

// Middleware pour analyser les requêtes JSON
app.use(bodyParser.json());

//Cross Fix
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

app.listen(port, () => {
  console.log(`Serveur Express écoutant sur le port ${port}`);
});
