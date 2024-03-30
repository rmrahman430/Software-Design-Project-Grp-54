const { register } = require('../Controllers/AuthControllers');
const User = require('../models/userModel');
const httpMocks = require('node-mocks-http');

jest.mock('../models/userModel');

describe('registerController.register', () => {
  test('should register a new user and return a token on success', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/register',
      body: {
        username: 'johndoe',
        password: 'securepassword',
        name: 'John Doe',
        email: 'john.doe@example.com',
      },
    });
    const userId = '12345';

    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });
  
    // Mock the register function
    User.create.mockResolvedValueOnce({ _id: userId })
  
    // Call the register function with mocked objects
    await register(req, res);
  
    // Assertions
    expect(res.statusCode).toBe(201); // Expect successful response (created: true)
    expect(res._getJSONData()).toEqual({ user: userId, created: true }); // Assuming _id exists on user
    expect(User.create).toHaveBeenCalledWith({
      username: 'johndoe',
      password: 'securepassword',
      name: 'John Doe',
      email: 'john.doe@example.com',
    });
  });

  
  // Add test cases for validation errors
  it('should return a 401 (Unauthorized) for email errors', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/register',
      body: {
        username: 'johndoe', // Assuming some validation error
        password: 'short', // Assuming password is too short
        name: 'John Doe',
        email: 'invalid_email', // Assuming invalid email format
      },
    });
    const userId = '12345';

    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });

    User.create.mockResolvedValueOnce({ _id: userId })

    // Call the register function with mocked objects
    await register(req, res);
    
    // Assertions
    expect(res.statusCode).toBe(401); // Expect Unauthorized response
    expect(res._getJSONData()).toEqual({ email: "Please enter a valid email address."});
    
  });
  it('should return a 401 (Unauthorized) for email errors', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/register',
      body: {
        username: 'johndoe', 
        password: 'short', 
        name: 'John Doe',
        email: '', // Assuming invalid email format
      },
    });
    const userId = '12345';

    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });

    User.create.mockResolvedValueOnce({ _id: userId })

    // Call the register function with mocked objects
    await register(req, res);
    
    // Assertions
    expect(res.statusCode).toBe(401); // Expect Unauthorized response
    expect(res._getJSONData()).toEqual({ email: "email field is required."});
    
  }); 

  it('should return a 401 (Unauthorized) for username errors', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/register',
      body: {
        username: '', 
        password: 'short', 
        name: 'John Doe',
        email: 'test@email.com', 
      },
    });
    const userId = '12345';

    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });

    User.create.mockResolvedValueOnce({ _id: userId })

    // Call the register function with mocked objects
    await register(req, res);
    
    // Assertions
    expect(res.statusCode).toBe(401); // Expect Unauthorized response
    expect(res._getJSONData()).toEqual({ username: "Username field is required."});
    
  });

  it('should return a 401 (Unauthorized) for password errors', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/register',
      body: {
        username: 'johndoe', 
        password: '', 
        name: 'John Doe',
        email: 'test@email.com', 
      },
    });
    const userId = '12345';

    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });

    User.create.mockResolvedValueOnce({ _id: userId })

    // Call the register function with mocked objects
    await register(req, res);
    
    // Assertions
    expect(res.statusCode).toBe(401); // Expect Unauthorized response
    expect(res._getJSONData()).toEqual({ password: "Password field is required."});
    
  });

  it('should return a 401 (Unauthorized) for name errors', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/register',
      body: {
        username: 'johndoe', 
        password: 'short', 
        name: '',
        email: 'test@email.com', 
      },
    });
    const userId = '12345';

    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });

    User.create.mockResolvedValueOnce({ _id: userId })

    // Call the register function with mocked objects
    await register(req, res);
    
    // Assertions
    expect(res.statusCode).toBe(401); // Expect Unauthorized response
    expect(res._getJSONData()).toEqual({ name: "name field is required."});
    
  });
});
