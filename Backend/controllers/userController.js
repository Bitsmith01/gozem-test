const User = require('../models/userModel');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "4715aed3c946f7b0lokoa38e6b534astan958362x8d84e96d10fbc04700770d572af3dce43625dd"

// Create users
exports.createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password, image } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashedPassword,
      image: image
    });

    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: 'Incorrect information' });
  }
};


// Check if a user with the given email exists
exports.checkEmailExists = async (req, res) => {
  const { email } = req.body;
  console.log(email);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error while checking the email' });
  }
};


// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Unable to retrieve users' });
  }
};

// Get user by Id
exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  try {
    const user = await User.findById(userId, '-password');
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: 'Unable to retrieve user' });
  }
};

// Get user home screen data

exports.Homscreen = async (req, res) => {
  const userId = req.user.userId;
  try {
    const user = await User.findById(userId, '-password');
    if (user) {
      const homeScreenData = [
        {
          type: "profile",
          content: {
            image: user.image,
            name: `${user.firstname} ${user.lastname}`,
            email: user.email,
          }
        },
        {
          type: "map",
          content: {
            title: "Location",
            pin: user.image,
          }
        },
        {
          type: "data",
          content: {
            title: "Information",
            source: "wss://echo.websocket.org",
            value: "Loading..."
          }
        }
      ];
      res.status(200).json(homeScreenData);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Unable to retrieve user' });
  }
}


exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Wrong password' });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token: token });
  } catch (err) {
    res.status(500).json({ error: 'Error while authenticating' });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { firstname, lastname, email, Password } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, { firstname, lastname, email, Password }, { new: true });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Unable to update user' });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    await User.findByIdAndRemove(userId);
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ error: 'Impossible de supprimer l\'utilisateur' });
  }
};
