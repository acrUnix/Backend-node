import dotenv from 'dotenv'
import express from 'express'
import bcrypt from 'bcrypt'
import { User } from '../models/user.js'
import jwt from 'jsonwebtoken'
const loginRouter = express.Router()

dotenv.config()

loginRouter.post('/loginuser', async (request, response) => {
  console.log('searching user..')
  const { username, password } = request.body
  console.log('solicitud de inicio de sesion entrante de: ', username, password)
  const user = await User.findOne({ username })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid user or password'
    })
  }

  const userToken = {
    username: user.username,
    userid: user._id
  }
  jwt.sign({ userToken }, process.env.SECRETKEY, (err, token) => {
    if (token) {
      return response.json({
        name: user.name,
        username: user.username,
        token
      })
    } else {
      return response.json({ error: err })
    }
  })
})
export { loginRouter }
