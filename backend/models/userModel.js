const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
});


UserSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.statics.login = async function(username, password) {
  const user = await this.findOne({ username });
  if(user) {
    const auth = await bcrypt.compare(password, user.password);
    if(auth) {
      return user;
    }
    throw Error("Incorrect Password");
  }
  throw Error("Incorrect Username");
}

UserSchema.statics.register = async function(userInfo) {
  const { username, password, name, email } = userInfo;

  if (password.length < 8) {
    throw Error("Password must be at least 8 characters long");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw Error("Invalid email format");
  }

  const user = await this.findOne({ username });
  if (user) {
    throw Error("Username is already taken");
  }

  const User = await this.create({ username, password, name, email });
  return User;
}


module.exports = mongoose.model("Users", UserSchema);
