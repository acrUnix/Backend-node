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
  const { username, country, password } = request.body
  try {
    if (!username || !password) {
      return response.status(400).end()
    } else {
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(password, saltRounds)

      const user = new User({
        username,
        country,
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

usersRouter.delete('/delete/:id', async (request, response, next) => {
  const { id } = request.params
  try {
    const user = await User.findByIdAndDelete(id)

    if (!user) {
      return response.status(204).json({ message: 'no existe el usuario' }).end()
    } else {
      console.log('se ha eliminado el siguiente usuario:')
      console.log(user)
      return response.status(200).json({ message: 'usuario eliminado con exito' }).end()
    }
  } catch (error) {
    next(error)
  }
})

export { usersRouter }
