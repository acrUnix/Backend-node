import { Schema, model } from 'mongoose'

const notasSchema = new Schema({
  name: String,
  country: String,
  content: String
})

notasSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject.__v
    delete returnedObject._id
  }
})

export const Note = model('Note', notasSchema)

export const createNotes = async (datos, next) => {
  try {
    const nota = new Note({
      name: datos.name,
      country: datos.country,
      content: datos.content
    })
    const newNota = await nota.save()
    return newNota
  } catch (error) {
    next(error)
  }
}
