const { login } = require('../Controllers/AuthControllers'); // Assuming correct path
const User = require('../models/userModel'); // Updated path
const bcrypt = require('bcrypt');
const { mockUsers } = require('./mockUserData');
const jwt = require('jsonwebtoken');

jest.mock('../models/userModel', () => ({
  findOne: jest.fn((query) => {
    const foundUser = mockUsers.find(user => user.username === query.username);
    return foundUser ? foundUser : null;
  }),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('your_jwt_token'), // Ensure it returns a token value
}));

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(), // Explicitly mock hash function
}));

describe('login function', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = { body: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });


  it('should return 400 for missing username or password', async () => {
    mockReq.body = {}; // Missing password
    await login(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ password: "Password field is required",username: "Username field is required." });

    mockReq.body = { password: 'valid_password' }; // Missing username
    await login(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledTimes(2); // Called twice
    expect(mockRes.json).toHaveBeenCalledTimes(2); // Called twice
  });

  it('should return 400 for user not found', async () => {
    mockReq.body = { username: 'test', password: 'valid_password' };
    User.findOne.mockReturnValueOnce(null); // User not found

    await login(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ username: "Username not found"});
  });

  it('should return 400 for incorrect password', async () => {
    mockReq.body = { username: 'user1', password: 'incorrect_password' };
    const mockUser = mockUsers.find(user => user.username === mockReq.body.username);
    bcrypt.compare.mockResolvedValueOnce(false); // Password mismatch
    
    await login(mockReq, mockRes);
    
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ password: "Password incorrect" }); // Generic error message
    expect(User.findOne).toHaveBeenCalledWith({ username: 'user1' }); // Verify user retrieval (optional)
    expect(bcrypt.compare).toHaveBeenCalledWith(mockReq.body.password, mockUser.password); // Verify password comparison
  });

  it('should find the user and return 200 on successful login', async () => {
    const mockUser = mockUsers.find(user => user.username === 'user2');
    const hashedPassword = mockUser.password; // Use the hashed password from mock data
  
    mockReq.body = { username: 'user2', password: 'hashed_password_2' };
    User.findOne.mockReturnValueOnce(mockUser);
    bcrypt.compare.mockResolvedValueOnce(true); // Password match
  
    jwt.sign.mockReturnValueOnce('your_jwt_token');
  
    await login(mockReq, mockRes);
  
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ user: '2', message: 'Login successful!' });



    expect(User.findOne).toHaveBeenCalledWith({ username: 'user2' });
    expect(bcrypt.compare).toHaveBeenCalledWith(mockReq.body.password, hashedPassword); // Verify password comparison with hashed password from mock data
    
    expect(jwt.sign).toHaveBeenCalledWith({ id: mockUser._id }, "singhprojectkey", { expiresIn: expect.any(Number) }); // Verify createToken function is called with user ID
    expect(mockRes.cookie).toHaveBeenCalledWith(
      'jwt',
      'your_jwt_token',
      { withCredentials: true, httpOnly: false, maxAge: expect.any(Number) }
    );
  });
  
  

  it('should return 400 for errors during login process', async () => {
    mockReq.body = { username: 'test', password: 'valid_password' };
    User.findOne.mockRejectedValueOnce(new Error('Database error'));

    await login(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Login unsuccessful!' }); // Generic error message for security
  });
});
