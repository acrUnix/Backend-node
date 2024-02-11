import { Schema, model } from 'mongoose'

const notasSchema = new Schema({
  name: String,
  country: String,
  content: String
})

export const Note = model('Note', notasSchema)

export const createNotes = (datos) => {
  const nota = new Note({
    name: datos.name,
    country: datos.country,
    content: datos.content
  })
  nota.save()
    .then(result => {
      console.log(result)
    })
    .catch(err => { console.error(err) })
}
