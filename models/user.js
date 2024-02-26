import { Schema, model } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = new Schema({
  username: { type: String, require: true, unique: true },
  name: { type: String, require: true, unique: true },
  passwordHash: { type: String, require: true, unique: true },
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Note'
  }]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject.__v
    delete returnedObject._id
    delete returnedObject.passwordHash
  }
})

export const User = model('User', userSchema)
