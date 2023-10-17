const User = require('../models/userModel');
const validator = require('validator');
const bcrypt = require('bcrypt');

// Créer un nouvel utilisateur
exports.createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!validator.isAlpha(firstname)) {
      return res.status(400).json({ error: 'First name should contain only letters' });
    }

    if (!validator.isAlpha(lastname)) {
      return res.status(400).json({ error: 'Last name should contain only letters' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashedPassword
    });

    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: 'Informations incorrectes' });
  }
};


// Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Impossible de récupérer les utilisateurs' });
  }
};



// Récupérer un utilisateur par son ID
exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: 'Impossible de récupérer l\'utilisateur' });
  }
};


// Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { firstname, lastname, email, Password } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, { firstname, lastname, email, Password }, { new: true });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Impossible de mettre à jour l\'utilisateur' });
  }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    await User.findByIdAndRemove(userId);
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ error: 'Impossible de supprimer l\'utilisateur' });
  }
};
