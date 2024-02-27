import express from 'express'
import bcrypt from 'bcrypt'
import { User } from '../models/user.js'
const usersRouter = express.Router()

usersRouter.get('/allusers', async (request, response, next) => {
  try {
    const allUsers = await User.find({}).populate('notes', {
      users: 0
    })
    console.log(allUsers)
    return response.status(200).json(allUsers).end()
  } catch (error) {
    next(error)
  }
})

usersRouter.post('/newuser', async (request, response, next) => {
  const { username, name, password } = request.body
  try {
    if (!username || !name || !password) {
      return response.status(400).end()
    } else {
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(password, saltRounds)

      const user = new User({
        username,
        name,
        passwordHash
      })
      const createdUser = await user.save()
      console.log('user creado:')
      console.log(createdUser)
      return response.status(200).json(createdUser).end()
    }
  } catch (error) {
    next(error)
  }
})

export { usersRouter }
