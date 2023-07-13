import mongoose from 'mongoose'

const connectDB = async (url) => {
    try {
        mongoose.set('strictQuery', true)
        await mongoose.connect(url)
        console.log('Connected to database.')
    } catch (error) {
        console.log('Couldnt connect to database.')
        console.log(error)
    }
}

export default connectDB