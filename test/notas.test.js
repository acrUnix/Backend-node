import mongoose from 'mongoose'
import { server } from '../index.js'
import { Note } from '../models.js'
import { initialNotes, api, getAllNotes } from './helpers.js'

beforeEach(async () => {
  await Note.deleteMany({})

  const note1 = new Note(initialNotes[0])
  note1.save()

  const note2 = new Note(initialNotes[1])
  note2.save()
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

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
