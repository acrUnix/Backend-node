import express from 'express'
import { Note } from '../models/note.js'
const notesRouter = express.Router()

notesRouter.get('/allnotes', async (request, response, next) => {
  try {
    const allnotes = await Note.find({})
    console.log(allnotes)
    return response.status(200).json(allnotes).end()
  } catch (error) {
    next(error)
  }
})

notesRouter.put('/:id', async (request, response, next) => {
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
    return response.status(200).json(noteToUpdate).end()
  } catch (error) {
    next(error)
  }
})

notesRouter.get('/:id', async (request, response, next) => {
  const { id } = request.params
  try {
    const note = await Note.findById(id)
    if (note) {
      console.log('se encontro la siguiente nota:')
      console.log(note)
      return response.status(200).json(note).end()
    } else {
      return response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
}
)

notesRouter.delete('/delete/:id', async (request, response, next) => {
  const { id } = request.params
  try {
    const note = await Note.findByIdAndDelete(id)

    if (!note) {
      return response.status(204).json({ message: 'no existe la nota' }).end()
    }
    console.log('se ha eliminado la siguiente nota:')
    console.log(note)
    return response.status(200).json({ message: 'nota eliminada con exito' }).end()
  } catch (error) {
    next(error)
  }
})

notesRouter.post('/newnote', async (request, response, next) => {
  const note = request.body
  if (!note || !note.content) {
    return response.status(400).json({ error: 'el recurso no se encuentra' }).end()
  } else {
    const newNote = {
      name: note.name,
      country: note.country,
      content: note.content
    }
    try {
      const createdNote = new Note(newNote)
      const savedNote = await createdNote.save()
      console.log('se ha creado una nota:')
      console.log(newNote)
      return response.status(201).json(savedNote).end()
    } catch (error) {
      next(error)
    }
  }
})

export { notesRouter }
