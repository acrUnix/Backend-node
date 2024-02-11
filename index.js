import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { connectMDB } from './mongodbConnection.js'
import { createNotes, Note } from './models.js'

const app = express()

dotenv.config()
// conectando a mongoDB..
connectMDB()

app.use(cors())
app.use(express.json())

let notasMongo = ['']

app.get('/api/notes', (req, res) => {
  Note.find({}).then(result => {
    console.log(result)
    res.status(200).json(result)
  })
})

app.get('/', (request, response) => {
  response.send('hola desde el servidor')
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  console.log(id)
  const note = notasMongo.find(not => not.id === id)
  console.log(note)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notasMongo = notasMongo.filter(note => note.id !== id)
  response.status(404).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body

  if (!note || !note.content) {
    response.status(400).json({ error: 'el recurso no se encuentra' })
  }

  const newNote = {
    name: note.name,
    country: note.country,
    content: note.content
  }

  createNotes(newNote)
  notasMongo = [...notasMongo, newNote]

  response.status(201).json(newNote)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`servidor corriendo en el puerto ${PORT}`)
})
