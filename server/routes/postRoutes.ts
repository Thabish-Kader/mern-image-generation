import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import { v2 as cloudinary } from "cloudinary";
import Post from "../mongodb/models/post";
dotenv.config();

const router = express.Router();

// Cloudinary configurations
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SERCRET,
});

router.post("/upload", async (req, res) => {
	try {
		const { photo, name, prompt } = req.body;
		const photoUrl = await cloudinary.uploader.upload(photo);

		const newPost = await Post.create({
			name,
			photo: photoUrl.url,
			prompt,
		});

		res.status(201).json({ success: true, data: newPost });
	} catch (error) {
		res.status(500).json({ success: false, message: error });
	}
});

router.get("/", async (req, res) => {
	try {
		const posts = await Post.find({});
		res.status(200).json({ success: true, data: posts });
	} catch (error) {
		res.status(500).json({ success: false, data: error });
	}

	const url = cloudinary.url("olympic_flag", {
		width: 100,
		height: 150,
		Crop: "fill",
	});
	res.status(200).send(`Retrieval successful ---> ${url}`);
});

export default router;
