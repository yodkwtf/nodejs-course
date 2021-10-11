const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const jwt = require('jsonwebtoken');

// # REGISTER USER
const register = async (req, res) => {
  // get the email
  const { name, password, email } = req.body;

  // find a user by email entered
  const emailAlreadyExists = await User.findOne({ email });

  // if user found, throw duplicate register error
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists');
  }

  // set up first account as admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? 'admin' : 'user';

  // create a user with specific properties
  const user = await User.create({ name, email, password, role });

  // create a token user to send token specific properties
  const tokenUser = { name: user.name, userId: user._id, role: user.role };

  // issue a JWT token
  const token = jwt.sign(tokenUser, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  // send back the user as a response
  res.status(StatusCodes.CREATED).json({ user: tokenUser, token });
};

// # LOGIN
const login = async (req, res) => {
  res.send('the LOGIN controller');
};

// # LOGOUT
const logout = async (req, res) => {
  res.send('the LOGOUT controller');
};

module.exports = {
  register,
  login,
  logout,
};
