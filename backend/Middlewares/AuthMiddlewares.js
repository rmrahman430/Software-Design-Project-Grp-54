const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

module.exports.checkUser = async (req, res, next) => {
    const token = req.cookies.jwt;
  
    if (!token) {
      // User is not logged in, send appropriate response or redirect
      return res.status(401).json({ message: 'Unauthorized: Please log in first' });
    }
  
    try {
      const decodedToken = await jwt.verify(token, "singhprojectkey");
      const user = await User.findById(decodedToken.id);
  
      if (user) {
        req.user = user; // Attach user object to the request for later use
        next();
      } else {
        // User not found with the provided token, handle appropriately
        return res.status(401).json({ message: 'Invalid token' });
      }
    } catch (err) {
      // Handle JWT verification errors
      console.error(err);
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
  