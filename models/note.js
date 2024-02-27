import { Schema, model } from 'mongoose'

const noteSchema = new Schema({
  name: String,
  country: String,
  content: String,
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject.__v
    delete returnedObject._id
  }
})

export const Note = model('Note', noteSchema)
