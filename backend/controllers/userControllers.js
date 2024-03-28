const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../config/generateToken");

// @desc      Register new user
// @route     POST api/user
// @access    Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password, pic } = req.body;

  if (!name || !email || !phone || !password) {
    res.status(400);
    throw new Error("Please enter all the feilds!");
  }

  //   Check user exists or not
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User email already exists!");
  }

  const userExistsMob = await User.findOne({ phone });
  if (userExistsMob) {
    res.status(400);
    throw new Error("Users mobile already exists!");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //   create user
  const user = await User.create({
    name,
    email,
    phone,
    password: hashedPassword,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data.");
  }
});

// @desc      Auth the user
// @route     POST api/user/login
// @access    Public
const authUser = asyncHandler(async (req, res) => {
  const { email, phone, password } = req.body;

  //   Check for user exists or not
  const user = await User.findOne({ email });

  //   Check for user exists or not
  const userMob = await User.findOne({ phone });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else if (userMob) {
    res.json({
      _id: userMob.id,
      name: userMob.name,
      phone: userMob.phone,
      email: userMob.email,
      pic: userMob.pic,
      token: generateToken(userMob._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data.");
  }
});

// @desc      Check if phone number exists
// @route     GET api/user/checkPhone
// @access    Public
const checkPhone = asyncHandler(async (req, res) => {
  const { phone } = req.query;

  // console.log(phone);
  const userExists = await User.findOne({ phone });
  if (userExists) {
    res.json({ exists: true });
  } else {
    res.json({ exists: false });
  }
});

// const authUserMob = asyncHandler(async (req, res) => {
//   const { phone } = req.body;

//   //   Check for user exists or not
//   const user = await User.findOne({ phone });
//   console.log(user);

//   if (user) {
//     res.json({
//       _id: user.id,
//       name: user.name,
//       phone: user.phone,
//       email: user.email,
//       pic: user.pic,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(400);
//     throw new Error("Invalid user data.");
//   }
// });

// @desc      Auth the user
// @route     GET api/user?search=""
// @access    Public
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
      $or: [
        { name: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
        { phone: { $regex: req.query.search, $options: "i" } },
      ],
    }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.json(users);
});

module.exports = { registerUser, authUser, checkPhone, allUsers };
