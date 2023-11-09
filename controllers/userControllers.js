const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, phone, password } = req.body;
  // let { pic } = req.body;
  if (!name || !phone || !password) {
    res.status(400);
    throw new Error("Please Enter all the values");
  }
  const userExists = await User.findOne({ phone });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  // if (!pic) {
  //   pic =
  //     "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
  // }
  const user = await new User({
    name,
    phone,
    password,
    // pic,
  });

  if (user) {
    await user.save();

    res.status(201).json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      // pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to Create the user");
  }
});
// const addPic = asyncHandler(async (req, res) => {
//   const { pics } = req.body;
//   console.log(pics);
//   if (pics) {
//     const user = await User.findOne({ _id: req.user._id });
//     if (user) {
//       user.pic = pics;
//       await user.save();
//       res.status(200).send(user);
//     }
//   } else {
//     res.status(400).send("pic is empty");
//   }
// });
const authUser = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;

  const user = await User.findOne({ phone });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      isAdmin: user.isAdmin,
      // pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid phone or Password");
  }
});
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { phone: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

module.exports = { registerUser, authUser, allUsers };
