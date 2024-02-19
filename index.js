import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { connectMDB } from './mongodbConnection.js'
import { createNotes, Note } from './models.js'
import { notFound } from './midellware/notFound.js'
import { castHerror } from './midellware/CastHerrorHandle.js'

const app = express()

dotenv.config()
// conectando a mongoDB..
connectMDB()

app.use(cors())
app.use(express.json())

app.get('/api/notes', async (request, response, next) => {
  try {
    const result = await Note.find({})
    console.log(result)
    response.status(200).json(result)
  } catch (error) {
    next(error)
  }
})

app.put('/api/notes/:id', async (request, response, next) => {
  const { id } = request.params
  const note = request.body
  const newNote = {
    name: note.name,
    country: note.country,
    content: note.content
  }
  try {
    const noteToUpdate = await Note.findByIdAndUpdate(id, newNote, { new: true })
    console.log('nueva nota modificada: ')
    console.log(noteToUpdate)
    response.json(noteToUpdate)
  } catch (error) {
    next(error)
  }
})

app.get('/api/notes/:id', async (request, response, next) => {
  const { id } = request.params
  try {
    const note = await Note.findById(id)
    if (note) {
      console.log('se encontro la siguiente nota:')
      console.log(note)
      return response.json(note)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
}
)

app.delete('/api/notes/:id', async (request, response, next) => {
  const { id } = request.params
  try {
    const note = await Note.findByIdAndDelete(id)
    console.log('se ha eliminado la siguiente nota:')
    console.log(note)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

app.post('/api/notes', async (request, response, next) => {
  const note = request.body
  if (!note || !note.content) {
    response.status(400).json({ error: 'el recurso no se encuentra' })
  } else {
    const newNote = {
      name: note.name,
      country: note.country,
      content: note.content
    }
    try {
      const createdNote = await createNotes(newNote)
      response.status(201).json(createdNote)
    } catch (error) {
      next(error)
    }
  }
})

app.use(notFound)

app.use(castHerror)

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log(`servidor corriendo en el puerto ${PORT}`)
})

export { app, server }
