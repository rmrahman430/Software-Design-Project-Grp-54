const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');  

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    }
});

UserSchema.pre("save", async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

UserSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
      next(new Error('Username or email already exists.'));
  } else {
      next();
  }
});

UserSchema.statics.login = async function(username, password) {
    const user = await this.findOne({ username });
    if (!user) {
        throw new Error("Incorrect username");
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
        throw new Error("Incorrect password");
    }
    return user;
}

UserSchema.statics.register = async function(userInfo) {
    const { username, password, name, email } = userInfo;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Invalid email format");
    }
    if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
    }

    const user = new this(userInfo);
    await user.save();
    return user;
}

UserSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET, {
        expiresIn: '2h'
    });
    return token;
}

module.exports = mongoose.model("Users", UserSchema);
