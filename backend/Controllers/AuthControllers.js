const User = require("../models/userModel");
const Price = require("../models/pricingModel");
const jwt = require("jsonwebtoken");
const clientInfo = require("../models/ClientInfo");
const profileCheck = require("../validation/profile");
const loginCheck = require("../validation/login");
const registerCheck = require("../validation/register");

require('dotenv').config();  

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge,
    });
};

const handleErrors = (err) => {
    let errors = {};

    if (err.message === "Incorrect Username") {
        errors.username = "Username is Incorrect";
    } else if (err.message === "Incorrect Password") {
        errors.password = "Password is Incorrect";
    } else if (err.message === "Password must be at least 8 characters long") {
        errors.regpassword = "Password field is required.";
    } else if (err.message === "Username is already taken") {
        errors.regusername = "Username field is required.";
    } else if (err.message === "Invalid email format") {
        errors.email = "Please enter a valid email address.";
    } else if (err.code === 11000) {
        if (err.keyPattern.username) {
            errors.username = "Username is already taken";
        } else if (err.keyPattern.email) {
            errors.email = "Email is already taken";
        }
    } else if (err.message && err.message.includes("Users validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    } else {
        console.error('Unexpected error during registration:', err);
        errors.unexpected = "An unexpected error occurred.";
    }

    return errors;
};

module.exports.register = async (req, res, next) => {
    try {
        const { username, password, name, email } = req.body;
        const { errors, isValid } = registerCheck({ username, password, name, email });

        if (!isValid) {
            return res.status(401).json(errors);
        }

        const user = await User.create({ username, password, name, email });
        res.status(201).json({ user: user._id, created: true });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(401).json({ errors, created: false });
    }
};

module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const { errors, isValid } = loginCheck({ username, password });

        if (!isValid) {
            console.log(errors);
            return res.status(401).json(errors);
        }

        const user = await User.login(username, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000,
        });
        res.status(200).json({ user: user._id, created: true });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(401).json({ errors, created: false });
    }
};
