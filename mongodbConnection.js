import mongoose from 'mongoose'

export const connectMDB = async () => {
  mongoose.set('strictQuery', false)
  const connectionString = process.env.MONGO_DB_URI
  await mongoose.connect(connectionString).then(() => {
    console.log('conectado a base de datos!')
  }).catch(err => console.error(err))
}
