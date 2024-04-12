

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');



describe('User Model Tests', () => {
  let mongoServer;

  beforeAll(async () => {
    process.env.JWT_SECRET = 'your_jwt_secret_for_testing';
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});
  afterAll(async () => {
      await mongoose.disconnect();
      await mongoServer.stop();
  });

  beforeEach(async () => {
      await User.deleteMany({});
  });

    test('should hash the password before saving', async () => {
        const user = new User({ username: 'testuser', password: 'password123', name: 'Test User', email: 'test@example.com' });
        await user.save();
        const foundUser = await User.findById(user._id);
        expect(await bcrypt.compare('password123', foundUser.password)).toBe(true);
    });

    test('should not allow duplicate usernames', async () => {
      await User.register({ username: 'testuser', password: 'password123', name: 'Test User', email: 'test@example.com' });
      await expect(User.register({ username: 'testuser', password: 'password123', name: 'Test User', email: 'test2@example.com' }))
          .rejects
          .toThrow(/duplicate key error/);  
  });
  
    test('should not allow duplicate emails', async () => {
        await User.register({ username: 'uniqueuser', password: 'password123', name: 'Unique User', email: 'test@example.com' });
        await expect(User.register({ username: 'uniqueuser2', password: 'password123', name: 'User Two', email: 'test@example.com' })).rejects.toThrow("Username or email already taken");
    });

    test('should fail login with incorrect username', async () => {
        await User.register({ username: 'testuser', password: 'password123', name: 'Test User', email: 'test@example.com' });
        await expect(User.login('wronguser', 'password123')).rejects.toThrow("Incorrect Username");
    });

    test('should fail login with incorrect password', async () => {
        await User.register({ username: 'testuser', password: 'password123', name: 'Test User', email: 'test@example.com' });
        await expect(User.login('testuser', 'wrongpassword')).rejects.toThrow("Incorrect Password");
    });

    test('should fail with invalid email format', async () => {
        const userInfo = { username: 'newuser', password: 'password123', name: 'New User', email: 'bademail' };
        await expect(User.register(userInfo)).rejects.toThrow("Invalid email format");
    });

    test('should not register a user with short password', async () => {
        const userInfo = { username: 'newuser', password: 'short', name: 'New User', email: 'user@example.com' };
        await expect(User.register(userInfo)).rejects.toThrow("Password must be at least 8 characters long");
    });

    test('should generate a valid JWT for a registered user', async () => {
        const userInfo = { username: 'testjwt', password: 'password123', name: 'JWT User', email: 'jwt@example.com' };
        const user = await User.register(userInfo);
        const token = user.generateAuthToken();
        expect(token).toBeDefined();
        expect(jwt.verify(token, process.env.JWT_SECRET)).toHaveProperty('_id', user._id.toString());
    });
    test('should throw error if username is too short', async () => {
      const userInfo = { username: 'ab', password: 'password1234', name: 'Short Name', email: 'email@example.com' };
      await expect(User.register(userInfo)).rejects.toThrow(/Username must be at least 3 characters long/);
  });

  test('should throw error if password is too short', async () => {
      const userInfo = { username: 'validuser', password: 'short', name: 'Valid Name', email: 'email@example.com' };
      await expect(User.register(userInfo)).rejects.toThrow(/Password must be at least 8 characters long/);
  });

  test('should throw error if email is invalid', async () => {
      const userInfo = { username: 'validuser', password: 'password1234', name: 'Valid Name', email: 'invalidemail' };
      await expect(User.register(userInfo)).rejects.toThrow(/Invalid email format/);
  });

  test('error handling for duplicate username', async () => {
      const userInfo = { username: 'testuser', password: 'password123', name: 'Test User', email: 'test1@example.com' };
      await User.register(userInfo);
      const duplicateUserInfo = { ...userInfo, email: 'test2@example.com' };
      await expect(User.register(duplicateUserInfo)).rejects.toThrow(/Username or email already taken/);
  });

  test('error handling for duplicate email', async () => {
      const userInfo = { username: 'testuser1', password: 'password123', name: 'Test User One', email: 'test@example.com' };
      await User.register(userInfo);
      const duplicateEmailInfo = { username: 'testuser2', password: 'password123', name: 'Test User Two', email: 'test@example.com' };
      await expect(User.register(duplicateEmailInfo)).rejects.toThrow(/Username or email already taken/);
  });

  test('should successfully generate a JWT token', async () => {
    const userInfo = { username: 'jwtuser', password: 'password123', name: 'JWT User', email: 'jwt@example.com' };
    const user = await User.register(userInfo);
    const token = user.generateAuthToken();
    expect(token).toBeDefined();
    expect(jwt.verify(token, process.env.JWT_SECRET)).toHaveProperty('_id', user._id.toString());
});

  test('should ensure JWT token expires in 1 hour', async () => {
      jest.spyOn(jwt, 'sign');
      const userInfo = { username: 'jwtuser', password: 'password123', name: 'JWT User', email: 'jwt@example.com' };
      const user = await User.register(userInfo);
      const token = user.generateAuthToken();
      expect(jwt.sign).toHaveBeenCalledWith(
          { _id: user._id.toString() },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
      );
  });

  test('should verify hashed password matches when logging in', async () => {
      const userInfo = { username: 'validuser', password: 'password1234', name: 'Valid User', email: 'email@example.com' };
      const user = await User.register(userInfo);
      const loggedInUser = await User.login('validuser', 'password1234');
      expect(loggedInUser).toBeDefined();
      expect(loggedInUser.username).toEqual(userInfo.username);
  });


});
