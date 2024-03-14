const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userModel = require('./models/userModel');
const clientInfo = require('./models/ClientInfo');

const app = express();
app.use(cors());
app.use(express.json());

const uri = require("./config/keys").mongoURI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then( () => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

app.post('/register', async (req, res) => {
  try {
    const { username, password, name, email} = req.body;


    const newUser = new userModel({
      username,
      password,
      name,
      email
    });

    const newProfile = new clientInfo ({
      fullname: name
    })

    await Promise.all([newUser.save(), newProfile.save()]);

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

// incomplete code
/*
app.get('/userProfile', async (req, res) => {
  try {
    const profile
  } catch(err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
*/

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
