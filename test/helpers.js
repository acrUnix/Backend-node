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
  const response = await api.get('/api/notes')
  return {
    response,
    contents: response.body.map(note => note.content)
  }
}

export { api, initialNotes, getAllNotes }
