import mongoose from 'mongoose'
import { passMDB } from './passwordMDB.js'

mongoose.set('strictQuery', false)

const connectionString = `mongodb+srv://BDacrUnix:${passMDB}@clusteracrunix.7coj64v.mongodb.net/local_library?retryWrites=true&w=majority`

mongoose.connect(connectionString).then(() => {
  console.log('conectado a base de datos!')
}).catch(err => console.error(err))
