const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User
const registerUser = async (name, email, password, mobile) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, mobile, email, password: hashedPassword });
  await newUser.save();
  return newUser;
};

// Simple Login
const loginUser = async (email, password) => {
  console.log("loginUser", email, password);
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error(
      "User not found. Please register if you don't have an account."
    );
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Invalid password");

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  console.log("loginUser", user, token);
  return { user, token };
};

// Google Login
const googleLogin = async (profile) => {
  let user = await User.findOne({ googleId: profile.id });

  if (!user) {
    user = new User({
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
    });
    await user.save();
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return { user, token };
};

//update user find by id and update
const updateUser = async (id, name, email, mobile) => {
  try {
    // Find user by ID
    console.log("updateUser", id, name, email, mobile);
    const existingUser = await User.findById(id);
    if (!existingUser) throw new Error("User not found");

    // Update user details only if provided
    if (name) existingUser.name = name;
    if (email) existingUser.email = email;
    if (mobile) existingUser.mobile = mobile;

    // Save updated user
    const updatedUser = await existingUser.save();

    return {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      mobile: updatedUser.mobile,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };
  } catch (error) {
    console.error("Update Error:", error.message);
    throw new Error(error.message);
  }
};

module.exports = { registerUser, loginUser, googleLogin, updateUser };
