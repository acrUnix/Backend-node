import dotenv from 'dotenv'
import express from 'express'
import { Note } from '../models/note.js'
import { User } from '../models/user.js'
import { verifyToken } from '../midellware/verifyToken.js'

const notesRouter = express.Router()

dotenv.config()

notesRouter.get('/allnotes', async (request, response, next) => {
  try {
    const allnotes = await Note.find({}).populate('users', {
      notes: 0
    })
    console.log(allnotes)
    return response.status(200).json(allnotes).end()
  } catch (error) {
    next(error)
  }
})

notesRouter.put('/:id', verifyToken, async (request, response, next) => {
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
    return response.sendStatus(200).json(noteToUpdate).end()
  } catch (error) {
    next(error)
  }
})

notesRouter.get('/:id', verifyToken, async (request, response, next) => {
  const { id } = request.params
  try {
    const note = await Note.findById(id)
    if (note) {
      console.log('se encontro la siguiente nota:')
      console.log(note)
      return response.sendStatus(200).json(note).end()
    } else {
      return response.sendStatus(404).end()
    }
  } catch (error) {
    next(error)
  }
}
)

notesRouter.delete('/delete/:id', verifyToken, async (request, response, next) => {
  const { id } = request.params
  try {
    const note = await Note.findByIdAndDelete(id)

    if (!note) {
      return response.status(204).json({ message: 'no existe la nota' }).end()
    } else {
      console.log('se ha eliminado la siguiente nota:')
      console.log(note)
      return response.status(200).json({ message: 'nota eliminada con exito' }).end()
    }
  } catch (error) {
    next(error)
  }
})

notesRouter.post('/newnote', verifyToken, async (request, response, next) => {
  const { name, country, content, userId } = request.body
  const { authenticatedUser } = request

  if (!name || !country || !content || !userId) {
    return response.status(400).json({ error: 'datos insuficientes' }).end()
  } else {
    try {
      const user = await User.findById(userId)
      const noteId = await Note.find({})
      const index = noteId.map(not => not.id)
      const createdNote = new Note({
        pos: index.length + 1,
        name,
        country,
        content,
        users: user._id
      })
      await createdNote.save()
      console.log('nota creada con exito:')
      console.log('identidad:', authenticatedUser)
      console.log('contenido:', createdNote)
      user.notes = user.notes.concat(createdNote._id)
      await user.save()

      return response.json({ authenticatedUser, createdNote }).end()
    } catch (error) {
      next(error)
    }
  }
})

export { notesRouter }
