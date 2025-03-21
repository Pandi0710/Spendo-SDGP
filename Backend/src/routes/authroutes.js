const express = require("express");
const passport = require("passport");
const {
  registerUser,
  loginUser,
  googleLogin,
  updateUser,
} = require("../services/authservices");

const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
    console.log("register", name, email, password, mobile);
    const user = await registerUser(name, email, password, mobile);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await loginUser(email, password);
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    try {
      const data = await googleLogin(req.user);
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Update User Route
router.put("/update", async (req, res) => {
  try {
    const { id, name, email, mobile } = req.body;
    console.log("update", id, name, email, mobile);
    const user = await updateUser(id, name, email, mobile);
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    //if password is incorrect
    res.status(400).json({ error: error
    });
    
  }
});

module.exports = router;
