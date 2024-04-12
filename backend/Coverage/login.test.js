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

    userModel.login.mockResolvedValue(user); 
    jwt.sign.mockReturnValue(token);

    await login(req, res);

    expect(res.statusCode).toBe(200); 
    expect(res._getJSONData()).toEqual({ user: 'user_id', created: true }); 

  });


  test('responds with error for empty username', async () => {
    const emptyUsernameReq = httpMocks.createRequest({
      method: 'POST',
      url: '/login',
      body: {
        username: '', 
        password: 'password',
      },
    });
  
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });

    const user = { _id: 'user_id' };
  
    userModel.login.mockResolvedValue(user);
  
    await login(emptyUsernameReq, res); 
    expect(res.statusCode).toBe(401); 
    expect(res._getJSONData()).toEqual({ username: "Username field is required."}); 
  });

  test('responds with error for empty password', async () => {
  
    const emptyPasswordReq = httpMocks.createRequest({
      method: 'POST',
      url: '/login',
      body: {
        username: 'admin',
        password: '',  
      },
    });
  
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });

    const user = { _id: 'user_id' };
  
    userModel.login.mockResolvedValue(user);
  
    await login(emptyPasswordReq, res); 
    expect(res.statusCode).toBe(401); 
    expect(res._getJSONData()).toEqual({ password: "Password field is required"}); 
  });
});
