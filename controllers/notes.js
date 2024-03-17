import dotenv from 'dotenv'
import express from 'express'
import { Note } from '../models/note.js'
import { User } from '../models/user.js'
import { verifyToken } from '../midellware/verifyToken.js'

const notesRouter = express.Router()

dotenv.config()

notesRouter.get('/allnotes', async (request, response, next) => {
  try {
    const allnotes = await Note.find({}).populate('users')
    console.log(allnotes)
    return response.status(200).json(allnotes).end()
  } catch (error) {
    next(error)
  }
})

notesRouter.put('/update/:id', async (request, response, next) => {
  const { id } = request.params
  const note = request.body
  console.log('desde react: ', note)
  const newNote = {
    title: note.title,
    gender: note.gender,
    content: note.content,
    important: note.important
  }
  try {
    const noteToUpdate = await Note.findByIdAndUpdate(id, newNote, { new: true })
    // console.log('nueva nota modificada: ')
    // console.log(noteToUpdate)
    return response.status(200).json(noteToUpdate)
  } catch (error) {
    next(error)
  }
})

notesRouter.get(':id', verifyToken, async (request, response, next) => {
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
  const { title, gender, content, important, userId } = request.body

  if (!title || !gender || !content || !important || !userId) {
    return response.status(400).json({ error: 'datos insuficientes' })
  } else {
    try {
      const user = await User.findById(userId)
      const noteId = await Note.find({})
      const index = noteId.map(not => not.id)
      const createdNote = new Note({
        pos: index.length + 1,
        title,
        gender,
        content,
        important,
        users: user._id
      })
      await createdNote.save()
      console.log('nota creada con exito:')
      console.log('contenido:', createdNote)
      user.notes = user.notes.concat(createdNote._id)
      await user.save()

      return response.json({ createdNote }).end()
    } catch (error) {
      next(error)
    }
  }
})

export { notesRouter }
