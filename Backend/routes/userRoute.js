const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userController');
const authenticateToken = require('../middleware/authUser');

router.post('/Register', usersController.createUser);
router.post('/Login', usersController.userLogin);
router.get('/', authenticateToken, usersController.getAllUsers); 
router.get('/:id', authenticateToken, usersController.getUserById); 
router.put('/:id', authenticateToken, usersController.updateUser); 
router.delete('/:id', authenticateToken, usersController.deleteUser); 

module.exports = router;
