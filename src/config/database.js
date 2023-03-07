import mongoose from 'mongoose'

const connectDB = async () => {
  mongoose.set('strictQuery', false)

  mongoose.connect(process.env.MONGO_URI)

  mongoose.connection.on('connected', () => {
    console.log('✅ —> Mongoose connected to DB')
  })

  mongoose.connection.on('disconnected', () => {
    console.log('❌ —> Mongoose disconnected!')
  })

  process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
  })
}

export default connectDB
