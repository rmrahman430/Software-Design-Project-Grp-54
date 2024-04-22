const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/userModel'); // Import your User model
const uri = require("../config/keys").mongoURI;

describe('User model', () => {
  // Connect to a MongoDB test database before running tests
  beforeAll(async () => {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  // Clean up the test database after all tests are done
  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('schema', () => {
    test('should be invalid if required fields are missing', async () => {
      const user = new User();
      await expect(user.validate()).rejects.toThrow();
    });

    test('should be valid if all required fields are provided', async () => {
      const user = new User({
        username: 'testuser',
        password: 'password123',
        name: 'Test User',
        email: 'test@example.com',
      });
      await expect(user.validate()).resolves.toBeUndefined();
    });
  });

  describe('pre-save hook', () => {
    test('should hash the password before saving', async () => {
      const user = new User({
        username: 'testuser',
        password: 'password123',
        name: 'Test User',
        email: 'test@example.com',
      });
      await user.save();
      expect(user.password).not.toBe('password123');
      await User.deleteOne({ _id: user._id });
    });
  });

  describe('post-save hook', () => {
    test('should throw error if username or email already exists', async () => {
      const user1 = new User({
        username: 'existinguser',
        password: 'password123',
        name: 'Existing User',
        email: 'existing@example.com',
      });
      await user1.save();

      const user2 = new User({
        username: 'existinguser', // Same username as user1
        password: 'password456',
        name: 'Another User',
        email: 'another@example.com',
      });

      await expect(user2.save()).rejects.toThrow('Username or email already exists.');
      await User.deleteOne({ _id: user1._id });
      await User.deleteOne({ _id: user2._id });
    });
  });
});
