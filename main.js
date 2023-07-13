import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

import connectDB from './mongodb/connect.js'
import dalleRoutes from './routes/dalleRoutes.js'
import postRoutes from './routes/postRoutes.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json()) //{limit:'50mb'}
app.use('/api/v1/dalle',dalleRoutes)
app.use('/api/v1/post',postRoutes)


app.get('/', (req, res) => {
    res.send('hello from dall_e')
})

const port = process.env.PORT

const startServer = () => {
    connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })
}
startServer()