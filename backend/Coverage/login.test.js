const { login } = require('../Controllers/AuthControllers');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const httpMocks = require('node-mocks-http');

jest.mock('../models/userModel');
jest.mock('jsonwebtoken');

describe('login handler', () => {

  test('logs in user with correct credentials', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/login',
      body: {
        username: 'admin',
        password: 'password',
      },
    });

    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });

    const user = { _id: 'user_id' };
    const token = 'fake_token';

    // Mock dependencies (if needed)
    userModel.login.mockResolvedValue(user); // Assuming userModel.login exists
    jwt.sign.mockReturnValue(token);

    await login(req, res);

    // Assertions on mocked response object
    expect(res.statusCode).toBe(200); // Check for successful response code
    expect(res._getJSONData()).toEqual({ user: 'user_id', created: true }); // Verify response data

  });


  test('responds with error for empty username', async () => {
    const emptyUsernameReq = httpMocks.createRequest({
      method: 'POST',
      url: '/login',
      body: {
        username: '', // Empty username
        password: 'password',
      },
    });
  
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });

    const user = { _id: 'user_id' };
  
    // Mock dependencies (if needed)
    // No need to mock userModel.login here (optional depending on implementation)
    userModel.login.mockResolvedValue(user);
  
    await login(emptyUsernameReq, res); // Test empty username
    expect(res.statusCode).toBe(401); // Expect unauthorized code
    expect(res._getJSONData()).toEqual({ username: "Username field is required."}); // Verify generic error message (optional)

  });

  test('responds with error for empty password', async () => {
  
    const emptyPasswordReq = httpMocks.createRequest({
      method: 'POST',
      url: '/login',
      body: {
        username: 'admin',
        password: '', // Empty password
      },
    });
  
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });

    const user = { _id: 'user_id' };
  
    // Mock dependencies (if needed)
    // No need to mock userModel.login here (optional depending on implementation)
    userModel.login.mockResolvedValue(user);
  
    await login(emptyPasswordReq, res); // Test empty password
    expect(res.statusCode).toBe(401); // Expect unauthorized code
    expect(res._getJSONData()).toEqual({ password: "Password field is required"}); // Verify generic error message (optional)
  });
});
