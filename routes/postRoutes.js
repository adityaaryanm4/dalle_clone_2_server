import express from 'express'
import Post from '../mongodb/models/post.js'
import * as dotenv from 'dotenv'

dotenv.config()

import {v2 as cloudinary} from 'cloudinary'
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });

const router = express.Router()

router.route('/').get(async (req, res) => {
    try {
        const result = await Post.find({})
        res.status(200).json({ success: true, result:result.reverse() })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: true, message: 'Something went wrong !' })
    }
})

router.route('/').post(async (req, res) => {
    const { name, prompt, photo } = req.body
    try {
        const cloudinary_result = await cloudinary.uploader.upload(photo)
        const result = await Post.create({
            name, prompt, photo:cloudinary_result.url
        })
        res.status(200).json({ success: true, message: 'Uploaded successfully !' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: true, message: 'Something went wrong !' })
    }
})

export default router