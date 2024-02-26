import { Note } from '../models/note.js'
import { server } from '../index.js'
import { mongoose } from 'mongoose'
import { initialNotes, api, getAllNotes } from './helpers.js'

beforeEach(async () => {
  await Note.deleteMany({})
  initialNotes.map(async (note) => {
    const newNote = new Note(note)
    await newNote.save()
  })
})

test('todas las notas notes', async () => {
  const { response } = await getAllNotes()
  expect(response.body).toHaveLength(initialNotes.length)
})

test('nota sobre enzo y el automotor', async () => {
  const { contents } = await getAllNotes()
  expect(contents).toContain('importancia para la cultura internacional')
})

test('resultado en json', async () => {
  await api
    .get('/api/notes/allnotes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('enviar un post al server', async () => {
  const newNot = {
    name: 'jeen',
    country: 'africa'
  }

  await api
    .post('/api/notes/newnote')
    .send(newNot)
    .expect(400)

  const { response } = await getAllNotes()
  expect(response.body).toHaveLength(initialNotes.length)
})

test('to delete a note', async () => {
  const { response: firstResponse } = await getAllNotes()
  const { body: note } = firstResponse
  const noteToDelete = note[0]

  await api
    .delete(`/api/notes/deletenote/${noteToDelete.id}`)
    .expect(204)

  const { contents, response: secondResponse } = await getAllNotes()
  expect(secondResponse.body).toHaveLength(initialNotes.length - 1)
  expect(contents).not.toContain(noteToDelete.content)
})

afterAll(async () => {
  await mongoose.connection.close()
  server.close()
})
