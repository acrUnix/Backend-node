import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

export const connectMDB = async () => {
  mongoose.set('strictQuery', false)
  let connectionString = ''
  if (NODE_ENV === 'test') {
    connectionString = MONGO_DB_URI_TEST
    console.log('Testing iniciado con base de datos de pruebas..')
  } else {
    connectionString = MONGO_DB_URI
  }
  await mongoose.connect(connectionString).then(() => {
    console.log('conectado a base de datos..')
  }).catch(err => console.error(err))
}
