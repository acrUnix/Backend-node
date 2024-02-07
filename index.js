import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

let notes = [
  {
    id: '1',
    name: 'brutal',
    country: 'argentina',
    content: 'live in new york'
  },
  {
    id: '2',
    name: 'acrRustic',
    country: 'liberia',
    content: 'live in suecia'
  },
  {
    id: '3',
    name: 'capital',
    country: 'suecia',
    content: 'live in argentina'
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
  response.send('hola desde el servidor')
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  console.log(id)
  const note = notes.find(not => not.id === id)
  console.log(note)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)
  response.status(404).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body

  if (!note || !note.content) {
    response.status(400).json({ error: 'el recurso no se encuentra' })
  }

  const ids = notes.map(not => not.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 100,
    content: note.content,
    name: note.name,
    country: note.country
  }

  notes = [...notes, newNote]

  response.status(201).json(newNote)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`servidor corriendo en el puerto ${PORT}`)
})
