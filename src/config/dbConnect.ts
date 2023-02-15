import mongoose from 'mongoose'
mongoose.set('strictQuery', false)

const dbConnect = async (MONGODB_URI: string) => {
    try {
        const conn = await mongoose.connect(MONGODB_URI)
        console.info(`Database connected: ${conn.connection.host}`)

    } catch (error) {
        console.error(error)
    }
}

export default dbConnect