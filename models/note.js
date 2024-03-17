import { Schema, model } from 'mongoose'

const noteSchema = new Schema({
  pos: Number,
  title: String,
  gender: String,
  content: String,
  important: Boolean,
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
