import mongoose from 'mongoose'
import { server } from '../index.js'
import { Note } from '../models.js'
import { initialNotes, api, getAllNotes } from './helpers.js'

beforeEach(async () => {
  await Note.deleteMany({})
  for (const note of initialNotes) {
    const noteCreated = new Note(note)
    await noteCreated.save()
  }
})

test('resultado en json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('todas las notas notes', async () => {
  const { response } = await getAllNotes()
  expect(response.body).toHaveLength(initialNotes.length)
})

test('nota sobre enzo y el automotor', async () => {
  const { contents } = await getAllNotes()
  expect(contents).toContain('importancia para la cultura internacional')
})

test('enviar un post al server', async () => {
  const newNot = {
    name: 'jeen',
    country: 'africa'
  }

  await api
    .post('/api/notes')
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
    .delete(`/api/notes/${noteToDelete.id}`)
    .expect(204)

  const { contents, response: secondResponse } = await getAllNotes()
  expect(secondResponse.body).toHaveLength(initialNotes.length - 1)
  expect(contents).not.toContain(noteToDelete.content)
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
