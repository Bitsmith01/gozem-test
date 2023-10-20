const WebSocket = require('ws');

const socket = new WebSocket('wss://echo.websocket.org');

socket.on('open', () => {
  console.log('Connexion WebSocket ouverte.');
});

socket.on('message', (data) => { 
  console.log('Données reçues du serveur WebSocket :', data);

});

socket.on('close', (code, reason) => {
  if (code === 1000) {
    console.log(`Connexion WebSocket fermée proprement, code : ${code}, raison : ${reason}`);
  } else {
    console.error('Connexion WebSocket interrompue de manière inattendue.');
  }
});

socket.on('error', (error) => {
  console.error('Erreur WebSocket :', error);
});
