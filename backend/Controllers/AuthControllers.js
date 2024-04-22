const User = require("../models/userModel");
const Price = require("../models/pricingModel");
const jwt = require("jsonwebtoken");
const clientInfo = require("../models/ClientInfo");
const validateProfileInput = require("../validation/profile");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const maxAge = 3*24*60*60;

const createToken = (id) => {
    return jwt.sign({id}, "singhprojectkey", {
        expiresIn: maxAge, 
    });
};

module.exports.register = async (req, res) => {
  try {
    const { username, password, name, email } = req.body;

    const { errors, isValid } = await validateRegisterInput(req.body);

    if (!isValid) {
        //console.log(errors);
        return res.status(400).json(errors);
    }

    await User.create({ username, password, name, email });
    const successMessage = `User ${username} has signed up successfully!`;
    return res.status(201).json({ message: successMessage });
    
  } catch (err) {
    return res.status(401).json({err, message: "User signup unsuccessful!"});
  }
};

module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });

    const { errors, isValid } = await validateLoginInput({ username, password });

    if (!isValid) {
        //console.log("output",errors);
        return res.status(400).json(errors);
    } else 
    {
      const token = createToken(user._id);

      res.cookie("jwt", token, {
        withCredentials: true,
        httpOnly: false,
        maxAge: maxAge * 1000,
      });
      return res.status(200).json({user: user._id, message: "Login successful!"})
    }
  }catch(err) {
    return res.status(400).json({message: "Login unsuccessful!"});
  }
};

module.exports.profile = async (req, res) => {
  try {
    // Extract user ID from JWT token
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, 'singhprojectkey');
    const userId = decodedToken.id;

    if (Object.keys(req.body).length === 0) {
      return res.status(200).json({ message: "Empty request" }); 
    }

    const { errors, isValid } = await validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    } else {
      // Use userId when querying for profile
      let profile = await clientInfo.findOne({ user: userId });

      if (profile) {
          // Update existing profile
          profile.fullname = req.body.fullname;
          profile.address1 = req.body.address1;
          profile.address2 = req.body.address2;
          profile.city = req.body.city;
          profile.state = req.body.state;
          profile.zipcode = req.body.zipcode;

          profile = await profile.save();
          return res.status(201).json({ created: false, profile, updated: true });
      } else {
          // Create new profile
          profile = await clientInfo.create({ user: userId, ...req.body });
          return res.status(201).json({ created: true, profile, updated: false });
      }
    }
  } catch (err) {
    return res.status(401).json({ message: "profile updation fail" });
  }
};

module.exports.getProfile = async (res) => {
  try {
    const profiles = await clientInfo.find({});
    return res.status(200).json({profiles: profiles}); 
  } catch (err) {
    return res.status(401).json({ err});
  }
};

module.exports.quote = async (req, res) => {
    try {
        const token = req.cookies.jwt; 
        const decodedToken = jwt.verify(token, 'singhprojectkey');
        const userId = decodedToken.id;

        const { user, gallonsRequested, suggestedPrice, address, deliveryDate, totalPrice } = req.body;
        const quote = await Price.create({ user: userId, ...req.body });
        res.status(201).json({ created: false, quote, updated: true });
    } catch (err) {
        res.status(401).json({ err});
    }
  };

module.exports.getFuelHistory = async (req, res) => {
    try {
        const token = req.cookies.jwt; 
        const decodedToken = jwt.verify(token, 'singhprojectkey');
        const userId = decodedToken.id;

        const history = await Price.find({ user: userId});
        res.status(200).json(history); 
    } catch (err) {
        res.status(401).json({ err});
    }
};