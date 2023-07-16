import express from 'express'
import axios from 'axios'
import * as dotenv from 'dotenv'

dotenv.config()

const app = express()
const router = express.Router()

router.route('/').get((req, res) => {
  res.send('hello from dalle routes.')
})

router.route('/').post(async (req, res) => {
  const { prompt } = req.body

  const options = {
    method: 'POST',
    url: 'https://openai80.p.rapidapi.com/images/generations',
    headers: {
      'accept-encoding': 'application/gzip',
      'content-type': 'application/json',
      'X-RapidAPI-Key': process.env.X_RapidAPI_Key,
      'X-RapidAPI-Host': process.env.X_RapidAPI_Host
    },
    data: {
      prompt: prompt,
      n: 1,
      size: '1024x1024'
    }
  };

  try {
    const response = await axios.request(options);
    res.status(200).json({ success: true, url: response.data.data[0].url })
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Something went wrong !' })
  }
})

export default router