const userModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

const maxAge = 3*24*60*60;

const createToken = (id) => {
    return jwt.sign({id}, "singhprojectkey", {
        expiresIn: maxAge, 
    });
};

const handleErrors = (err) => {
    let errors = { username: '', password:'' } ;

    if(err.message === "Incorrect Username") {
        errors.username = "Username is Incorrect";
    }

    if(err.message === "Incorrect Password") {
        errors.username = "Password is Incorrect";
    }

    if(err.code === 11000) {
        errors.username = "Username is already taken";
        return errors;
    }

    if(err.code === 11000) {
        errors.email = "Email is already taken";
        return errors;
    }


    if(err.message.includes("Users validation failed")) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }
    return errors;
};

module.exports.register = async (req, res, next) => {
    try {
        const { username, password, name, email } = req.body;
        const user = await userModel.create( {username, password, name, email});
        const token = createToken(user._id);

        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000,
        });
        res.status(201).json({user: user._id, created: true})
    } catch(err) {
        console.log(err);
        const errors = handleErrors(err);
        res.json({ errors, created: false })
    }
};

module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.login( username, password );
        const token = createToken(user._id);

        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000,
        });
        res.status(200).json({user: user._id, created: true})
    } catch(err) {
        console.log(err);
        const errors = handleErrors(err);
        res.json({ errors, created: false })
    }
};