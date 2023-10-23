# Gozem Mobile App

Welcome to the Gozem Mobile App repository! This app is designed for the GOZEM ANDROID / IOS DEVELOPER BUSINESS CASE test and serves as the client application for the Gozem platform. This README will provide you with all the information you need to get started with the app, its features, and how to contribute to its development.

## Table of Contents

- [Server Application](#server-application)
- [Mobile App](#mobile-app)

## Server Application

### Getting Started

#### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js:** You should have Node.js installed on your server.

- **Database (MongoDB):** Your server may require a database. Specify any database prerequisites here.

#### Installation

1. **Clone the repository:**

   ```bash
     git clone git@github.com:Bitsmith01/gozem-test.git
   
2. **Navigate to the Server Directory**
   ```bash
     cd Backend

3. _Install all dependencies & start server_

```bash
    cd Backend
    npm install
    npm start
```
### API Endpoints and User Management

- **Base URL:** `http://your-localip:5000`

- **POST /api/users/Register**
  - Description: Create a new user.
  - Request Body: User registration data ( first name, last name, email, password).
  - Authentication: Not required.
  - Response: New user object.

- **POST /api/users/Login**
  - Description: User login.
  - Request Body: User login credentials (email and password).
  - Authentication: Not required.
  - Response: Authentication token upon successful login.

- **GET /api/users/**
  - Description: Get a list of all users.
  - Authentication: Required.
  - Response: List of user objects.

- **GET /api/users/Home**
  - Description: Retrieve data for the home screen.
  - Authentication: Required.
  - Response: Data for the home screen.

- **GET /api/users/:id**
  - Description: Get a user by their ID.
  - Request Parameters: User ID.
  - Authentication: Required.
  - Response: User object.

- **PUT /api/users/:id**
  - Description: Update user information.
  - Request Parameters: User ID.
  - Request Body: Updated user data.
  - Authentication: Required.
  - Response: Updated user object.

- **POST /checkEmailExists**
  - Description: Check if an email address already exists.
  - Request Body: Email address to check.
  - Authentication: Not required.
  - Response: Result indicating email existence.

- **DELETE /:id**
  - Description: Delete a user account.
  - Request Parameters: User ID.
  - Authentication: Required.
  - Response: Deletion status.

### WEBSOCKET

WebSockets are used to facilitate real-time communication with client applications. The server listens for WebSocket connections and handles messages between the server and connected clients.

- **WebSocket URL:** `ws://your-localip:5000`

#### WebSocket Events

The following WebSocket events are available:

1. **Connection:** The server logs when a client connects to the WebSocket server.

2. **Disconnect:** The server logs when a client disconnects from the WebSocket server.

3. **Message Count:** The server listens for and increments a message count whenever a 'message' event is received from a client. The server then emits the updated message count to all connected clients.

   Example:
   - Client sends 'message' event with data.
   - Server increments the message count.
   - Server emits 'messageCount' event with the updated message count to all clients.

## Mobile Application

## Getting Started

### Prerequisites

Before you get started, make sure you have the following:

- **Node.js:** Ensure you have Node.js installed on your development machine.

### Installation

1. _Clone the repository:_

```bash
     git clone git@github.com:Bitsmith01/gozem-test.git
```

2. _Install all dependencies & start app_

```bash
    cd Mobil-app
    npm install
```

2. _Configuration_

You will need your computer's local IP address, which is essential for testing the app on a physical device connected to the same network.

- **Get your computer Ip**
  for linux: ip addr show
  for windows : ipconfig

- **Set the local ip \***
  Go to /Mobile-App/constantes/index.js and add your local address on base url

3. _Start your expo_

```bash
    npx expo start
```

After this take your phone an scan the qr code.
