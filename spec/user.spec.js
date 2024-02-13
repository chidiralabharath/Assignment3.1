// spec/user.spec.js
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/user');

describe('User API', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://chidiralabharath208:Bharath100@cluster0.g7k3soh.mongodb.net/newdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const res = await request(app)
        .post('/users')
        .send({
          name: 'Mr xyz',
          email: 'xyz@google.com',
          age: 30
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body.name).toEqual('Mr xyz');
      expect(res.body.email).toEqual('xyz@google.com');
      expect(res.body.age).toEqual(30);
    });

    it('should not create a user with missing fields', async () => {
      const res = await request(app)
        .post('/users')
        .send({
          name: 'Mr xyz',
          age: 25 // Missing email field
        });
      expect(res.statusCode).toEqual(400);
    });
  });

  describe('GET /users', () => {
    it('should return all users', async () => {
      await User.create({ name: 'Alex', email: 'alex@google.com', age: 35 });
      await User.create({ name: 'Bharath', email: 'bharath@google.com', age: 40 });

      const res = await request(app).get('/users');
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toEqual(2);
    });
  });

  // Add more test cases for other CRUD operations
});
