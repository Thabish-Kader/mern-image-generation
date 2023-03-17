import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import { v2 as cloudinary } from "cloudinary";
dotenv.config();

const router = express.Router();

// Cloudinary configurations
cloudinary.config({
	cloud_name: "dztwicnc1",
	api_key: "527242472995275",
	api_secret: "QZviuWr3ufNY6--EvFhiYPz4xOA",
});

// Upload

router.post("/upload", (req, res) => {
	let url = "";
	const { image_id, image_url } = req.body;
	const response = cloudinary.uploader
		.upload(image_url, { public_id: image_id })
		.then((data) =>
			res.status(200).send(`Uploaded ---> ${data.secure_url}`)
		)
		.catch((error) => console.log(error));
});

res.then((data) => {
	console.log(data);
	console.log(data.secure_url);
}).catch((err) => {
	console.log(err);
});

// Generate
const url = cloudinary.url("olympic_flag", {
	width: 100,
	height: 150,
	Crop: "fill",
});

// The output url
console.log(url);
// https://res.cloudinary.com/<cloud_name>/image/upload/h_150,w_100/olympic_flag

export default router;
