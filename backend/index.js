const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userModel = require('./models/userModel');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://willysonhuang:UciroAheAMVqWqGU@singhproject.dfoslf8.mongodb.net/singhproject?retryWrites=true&w=majority");


app.post('/register', async (req, res) => {
  try {
    const { username, password, name, email, age } = req.body;


    const newUser = new userModel({
      username,
      password,
      name,
      email,
      age,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    if (user) {
      const isMatch = await userModel.findOne({ password });
      console.log("found", user);

      if (isMatch) {
        console.log("success");
        res.json({ message: 'Login successful', user: { username: user.username, name: user.name }});
      } else {
        console.log("invalid pass");
        res.status(400).json({ error: 'Invalid password' });
      }
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getUsers', async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
