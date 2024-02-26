import supertest from 'supertest'
import { app } from '../index.js'

const api = supertest(app)

const initialNotes = [{
  name: 'hann',
  country: 'alemania',
  content: 'importancia para la cultura internacional'
},
{
  name: 'enzo',
  country: 'alemania',
  content: 'precursores del automotor'
}]

const getAllNotes = async () => {
  const response = await api.get('/api/notes/allnotes')
  const { body: notes } = response
  const contents = notes.map(note => note.content)
  return {
    response,
    contents
  }
}

const getAllUsers = async () => {
  const response = await api.get('/api/users/allusers')
  const { body: users } = response
  return {
    response,
    users
  }
}
export { api, initialNotes, getAllNotes, getAllUsers }
