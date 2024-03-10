const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userModel = require('./models/userModel');

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
