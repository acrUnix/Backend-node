import mongoose from 'mongoose'
import { passMDB } from './passwordMDB.js'

export const connectMDB = async () => {
  mongoose.set('strictQuery', false)
  const connectionString = `mongodb+srv://BDacrUnix:${passMDB}@clusteracrunix.7coj64v.mongodb.net/notas?retryWrites=true&w=majority`

  await mongoose.connect(connectionString).then(() => {
    console.log('conectado a base de datos!')
  }).catch(err => console.error(err))
}
