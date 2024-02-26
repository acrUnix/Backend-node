import bcrypt from 'bcrypt'
import { User } from '../models/user.js'
import { api, getAllUsers } from './helpers.js'
import { server } from '../index.js'
import mongoose from 'mongoose'

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('passHashed', 10)
  const newUser = new User({
    username: 'testingname',
    name: 'prog',
    passwordHash
  })
  await newUser.save()
})

test('creating new user..', async () => {
  const { users: firstUsers } = await getAllUsers()
  const newUser2 = {
    username: 'prog2',
    name: 'roma',
    password: 'linajedorado'
  }

  await api
    .post('/api/users/newuser')
    .send(newUser2)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const { users: secondUsers } = await getAllUsers()
  expect(secondUsers).toHaveLength(firstUsers.length + 1)
  const listUsername = secondUsers.map(user => user.username)
  expect(listUsername).toContain(newUser2.username)
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
