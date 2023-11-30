import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Post from "../mongodb/models/post.js";
import User from "../mongodb/models/user.js";
dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//get all posts
router.route("/").get(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});
router.delete("/", async (req, res) => {
  try {
    const _id = req.body;
    const result = await Post.findByIdAndDelete(_id);
    res.status(200).json({ _id });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });
    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});
// router.get("/mypost", async (req, res) => {
//   try {
//     const { email } = req.body; // Get the email from the request body
//     console.log(email);
//     // Find posts where the author's email matches the provided email
//     const posts = await Post.find({ email: email });
//     res.sendStatus(200).json({ data: posts, message: "my posts" });

//     // res.status(200).json({ success: true, data: posts });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error });
//   }
// });
router.route("/mypost").post(async (req, res) => {
  try {
    const { name } = req.body;
    const userPosts = await Post.find({ name: name });
    console.log(name);
    // console.log(req.body.email);
    res.status(200).json({ success: true, data: userPosts });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

export default router;
