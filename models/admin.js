const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      min: 3,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    mobileNumber: {
      type: String,
    },
    adminImage: {
      type: String,
    },
  },
  { timestamps: true }
);

// static methods
adminSchema.statics.signup = async function (
  email,
  password,
  firstName,
  lastName,
  mobileNumber,
  adminImage
) {
  if (!email || !password || !firstName || !lastName || !mobileNumber) {
    throw Error("All fields must be filled.");
  }

  if (!email || !password) {
    throw Error("Email and password must be filled.");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid.");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not valid.");
  }
  // here this refers to adminSchema
  const userExists = await this.findOne({ email });
  if (userExists) {
    throw Error("Email Already exists.");
  }
  const salt = await bcrypt.genSalt(10); // hash generation based on value
  const hash = await bcrypt.hash(password, salt);
  const user = this.create({
    email,
    password: hash,
    firstName,
    lastName,
    mobileNumber,
    adminImage,
  });
  return user;
};

// static login
adminSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Email and password must be filled.");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email id");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect Password");
  }
  return user;
};

module.exports = mongoose.model("Admin", adminSchema);
