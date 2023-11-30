import express from "express";
import User from "../mongodb/models/user.js";

const router = express.Router();

router.route("/").post(async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    console.log(existingUser.email, existingUser.password);
    // check if user exists and password is correct
    if (existingUser.email === email && existingUser.password === password) {
      res.status(200).json({ message: "login successful", data: existingUser });
    } else {
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
router.route("/").get(async (req, res) => {
  res.status(200).json({ message: "login page" });
});

export default router;
