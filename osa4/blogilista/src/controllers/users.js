const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1})

    response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const takenUser = await User.findOne({ username })

  if (username.length < 3 || password.length < 3) {
    return response.status(400).json({
        error: 'username or password is too short'
    })
  }
  if (takenUser) {
    return response.status(400).json({
        error: 'usename already taken'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

   return response.status(201).json(savedUser)
})

module.exports = usersRouter