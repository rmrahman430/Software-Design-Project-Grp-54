const { register } = require('../Controllers/AuthControllers');
const User = require('../models/userModel');

jest.mock('../models/userModel');

describe('register function', () => {
  let mockCreate;
  let req;
  let res;

  it('should successfully register a user', async () => {
    mockCreate = jest.fn();
    User.create.mockImplementation(mockCreate);

    req = {
      body: {
        username: 'test_user',
        password: 'password123',
        name: 'John Doe',
        email: 'test@example.com',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(), // Mock status method to chain calls
      json: jest.fn(),
    };

    mockCreate.mockResolvedValueOnce({}); // Mock successful creation

    await register(req, res);

    expect(mockCreate).toHaveBeenCalledWith({
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      email: req.body.email,
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: `User ${req.body.username} has signed up successfully!`,
    });

    jest.clearAllMocks(); // Clear mocks after the test
  });

  it('should return error for password less than 8 characters', async () => {
  
    const mockSave = jest.fn();
    User.prototype.save = mockSave;
  
    const req = {
      body: {
        username: 'test_user',
        password: 'short', // Password under 8 characters
        name: 'John Doe',
        email: 'test@example.com',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(), // Mock status method to chain calls
      json: jest.fn(),
    };
  
    await register(req, res);
  
    expect(mockSave).toHaveBeenCalledTimes(0); 
    expect(res.status).toHaveBeenCalledWith(400); // Expect bad request (400)
    expect(res.json).toHaveBeenCalledWith({
      password: "Password must be at least 8 characters long.", // Specific error message
    });
  });
  it('test for invalid email format', async () => {
  
    const mockSave = jest.fn();
    User.prototype.save = mockSave;
  
    const req = {
      body: {
        username: 'test_user',
        password: 'password123', // Password under 8 characters
        name: 'John Doe',
        email: 'test',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(), // Mock status method to chain calls
      json: jest.fn(),
    };
  
    await register(req, res);
  
    expect(mockSave).toHaveBeenCalledTimes(0); 
    expect(res.status).toHaveBeenCalledWith(400); // Expect bad request (400)
    expect(res.json).toHaveBeenCalledWith({
      email: "Please enter a valid email address.", // Specific error message
    });
  });
  it('should return error for username already taken', async () => {
    const existingUsername = 'bob';
    const mockFindOne = jest.fn();
    mockFindOne.mockResolvedValueOnce({ username: existingUsername }); // Mock existing user
  
    User.findOne = mockFindOne; // Mock User.findOne
  
    const req = {
      body: {
        username: existingUsername, // Set username to existing one
        password: 'password123',
        name: 'John Doe',
        email: 'test@example.com',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(), // Mock status method to chain calls
      json: jest.fn(),
    };
  
    await register(req, res);
  
    expect(mockFindOne).toHaveBeenCalledWith({ username: existingUsername }); // Verify username check
    expect(mockCreate).toHaveBeenCalledTimes(0); // User.create shouldn't be called
    expect(res.status).toHaveBeenCalledWith(400); // Expect bad request (400)
    expect(res.json).toHaveBeenCalledWith({
      username: "Username is already taken.", // Specific error message
    });
  
    jest.clearAllMocks(); // Clear mocks after the test
  });
  it('test for empty email ', async () => {
  
    const mockSave = jest.fn();
    User.prototype.save = mockSave;
  
    const req = {
      body: {
        username: 'test_user',
        password: 'password123', // Password under 8 characters
        name: 'John Doe',
        email: '',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(), // Mock status method to chain calls
      json: jest.fn(),
    };
  
    await register(req, res);
  
    expect(mockSave).toHaveBeenCalledTimes(0); 
    expect(res.status).toHaveBeenCalledWith(400); // Expect bad request (400)
    expect(res.json).toHaveBeenCalledWith({
      email: "Email field is required.", // Specific error message
    });
  });
  it('test for empty username', async () => {
  
    const mockSave = jest.fn();
    User.prototype.save = mockSave;
  
    const req = {
      body: {
        username: '',
        password: 'password123', // Password under 8 characters
        name: 'John Doe',
        email: 'test@example.com',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(), // Mock status method to chain calls
      json: jest.fn(),
    };
  
    await register(req, res);
  
    expect(mockSave).toHaveBeenCalledTimes(0); 
    expect(res.status).toHaveBeenCalledWith(400); // Expect bad request (400)
    expect(res.json).toHaveBeenCalledWith({
      username: "Username field is required.", // Specific error message
    });
  });
  it('test for empty password', async () => {
  
    const mockSave = jest.fn();
    User.prototype.save = mockSave;
  
    const req = {
      body: {
        username: 'test_user',
        password: '', // Password under 8 characters
        name: 'John Doe',
        email: 'test@example.com',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(), // Mock status method to chain calls
      json: jest.fn(),
    };
  
    await register(req, res);
  
    expect(mockSave).toHaveBeenCalledTimes(0); 
    expect(res.status).toHaveBeenCalledWith(400); // Expect bad request (400)
    expect(res.json).toHaveBeenCalledWith({
      password: "Password field is required.", // Specific error message
    });
  });
  it('test for empty name', async () => {
  
    const mockSave = jest.fn();
    User.prototype.save = mockSave;
  
    const req = {
      body: {
        username: 'test_user',
        password: 'password123', // Password under 8 characters
        name: '',
        email: 'test@example.com',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(), // Mock status method to chain calls
      json: jest.fn(),
    };
  
    await register(req, res);
  
    expect(mockSave).toHaveBeenCalledTimes(0); 
    expect(res.status).toHaveBeenCalledWith(400); // Expect bad request (400)
    expect(res.json).toHaveBeenCalledWith({
      name: "Name field is required.", // Specific error message
    });
  });

});

