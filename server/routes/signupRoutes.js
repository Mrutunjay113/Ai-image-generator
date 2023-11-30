import express from "express";
import User from "../mongodb/models/user.js";

const router = express.Router();

router.route("/").post(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // // Check if user already exists
    // const existingUser = await User.findOne({ email });
    const existingUserName = await User.findOne({ name });
    // console.log(existingUserName, existingUser);
    if (existingUserName) {
      // check if user exists is correct
      res.status(200).json({
        message: "User exist, pls login",
        data: existingUserName.name,
        success: false,
      });
    }
    // Create new user
    else {
      const user = await User.create({ name, email, password });
      res.status(201).json({
        message: "User created successfully",
        data: user,
        success: true,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.route("/").get((req, res) => {
  res.status(200).json({ message: "signup" });
});

export default router;
