const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../index')
const User = require('../models/User')


test('Should signup a new user', async () => {
  const response = await request('127.0.0.1:4000').post('/register')
    .send({
      name: 'harsh',
      email: "hp@gmail.com",
      password: "123"
    })
    .expect(201)
  //Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id)
  expect(response.body).toMatchObject({
    user: {
      name: 'harsh',
      email: "hp@gmail.com"
    },
    token: user.tokens[0].token
  })
  expect(user.password).not.toBe('123')

})