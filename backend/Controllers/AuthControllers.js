const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const clientInfo = require("../models/ClientInfo");
const profileCheck = require("../validation/profile");

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
        errors.password = "Password is Incorrect";
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

module.exports.profile = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(200).json({}); // Or send a success message without errors
        }
        const { errors, isValid } = profileCheck(req.body);
        console.log(req.body);

        if (!isValid) {
            console.log(errors);
            return res.status(400).json(errors);
        }

        const token = req.cookies.jwt; 
        const decodedToken = jwt.verify(token, 'singhprojectkey');
        const userId = decodedToken.id;

        let profile = await clientInfo.findOne({ user: userId });

        if (profile) {
            profile.fullname = req.body.fullname;
            profile.address1 = req.body.address1;
            profile.address2 = req.body.address2;
            profile.city = req.body.city;
            profile.state = req.body.state;
            profile.zipcode = req.body.zipcode;

            profile = await profile.save();
            return res.status(201).json({ created: false, profile, updated: true });
        } else {
            profile = await clientInfo.create({ user: userId, ...req.body });
            return res.status(201).json({ created: true, profile, updated: false });
        }
    } catch(err) {
        console.log(err);
        const errors = handleErrors(err);
        res.json({ errors, created: false })
    }
}

