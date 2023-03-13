const express = require('express');
const dotenv = require('dotenv');
const { v2 } = require('cloudinary');
const Post = require('../mongodb/models/post.js');

dotenv.config();

const router = express.Router();

const cloudinary = v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

router.post('/', async (req, res) => {

    try {
        const { name, prompt, photo } = req.body;
        const photoURL = await cloudinary.uploader.upload(photo);

        const newPost = await Post.create({
            name,
            prompt,
            photo: photoURL.url
        });

        res.status(201).json({ success: true, data: newPost });
    } catch (err) {
        res.status(500).json({ success: false, message: err });
    }
})

router.get('/', async (req, res) => {

    try {
        const posts = await Post.find({});
        if (!posts) {
            res.status(404).json({ success: true, message: "No posts available" });
        }
        res.status(201).json({ success: true, data: posts });
    } catch (err) {
        res.status(500).json({ success: false, message: err });
    }
})

module.exports = router;

