import { Schema, model } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = new Schema({
  username: { type: String, require: true, unique: true },
  name: { type: String, require: true, unique: true },
  age: { type: Number, require: false, unique: false },
  country: { type: String, require: false, unique: false },
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
