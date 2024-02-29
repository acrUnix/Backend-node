import express from 'express'
import bcrypt from 'bcrypt'
import { User } from '../models/user.js'
import jwt from 'jsonwebtoken'
const loginRouter = express.Router()

loginRouter.post('/loginuser', async (request, response) => {
  console.log('searching user..')
  const { username, password } = request.body
  const user = await User.findOne({ username })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid user or password'
    })
  }

  /*onst userToken = {
    name: user.name,
    username: user.username
  }
  jwt.sign({ userToken }, process.env.secretKey, (err, token) => {
    if (err) {
       return response.
    }
  })*/

  return response.send({
    name: user.name,
    username: user.username
  })
})
export { loginRouter }
