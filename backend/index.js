const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./Routes/AuthRoutes');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');

const uri = require("./config/keys").mongoURI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then( () => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

// CORS middleware should be placed before any route definitions
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true,
}));

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Serve the 'index.html' file for any other routes
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.use(cookieParser());
app.use(express.json());
app.use("/", authRoutes);
app.use('/', fuelRoutes);

app.listen(4000, () => {
  console.log("Server Started on PORT 4000");
});
