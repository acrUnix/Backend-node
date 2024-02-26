import express from 'express'
import bcrypt from 'bcrypt'
import { User } from '../models/user.js'
const usersRouter = express.Router()

usersRouter.get('/allusers', async (request, response, next) => {
  try {
    const allUsers = await User.find({})
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
      await user.save()
      console.log('user creado:')
      console.log(user)
      return response.status(200).json(user).end()
    }
  } catch (error) {
    next(error)
  }
})

export { usersRouter }
