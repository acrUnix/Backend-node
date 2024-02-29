import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { connectMDB } from './mongodbConnection.js'
import { notFound } from './midellware/notFound.js'
import { castHerror } from './midellware/CastHerrorHandle.js'
import { usersRouter } from './controllers/users.js'
import { notesRouter } from './controllers/notes.js'
import { loginRouter } from './controllers/login.js'

const PORT = process.env.port
const app = express()

dotenv.config()
// conectando a mongoDB..
connectMDB()

app.use(cors())
app.use(express.json())
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/notes', notesRouter)
app.use(notFound)
app.use(castHerror)

const server = app.listen(PORT, () => {
  console.log(`servidor corriendo en el puerto ${PORT}`)
})

export { app, server }
