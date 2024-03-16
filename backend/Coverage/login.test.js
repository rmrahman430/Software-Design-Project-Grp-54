const { login } = require('../Controllers/AuthControllers');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

jest.mock('../models/userModel');
jest.mock('jsonwebtoken');
const maxAge = 3*24*60*60;

describe('login handler', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = { cookie: jest.fn(), status: jest.fn(), json: jest.fn() };
    next = jest.fn();
  });

  test('logs in user with correct credentials', async () => {
    req.body.username = 'admin';
    req.body.password = 'password';
    const user = { _id: 'user_id' };
    const token = 'fake_token';

    userModel.login.mockResolvedValue(user);
    jwt.sign.mockReturnValue(token);

    await login(req, res, next);

    expect(userModel.login).toHaveBeenCalledWith('admin', 'password');
    expect(jwt.sign).toHaveBeenCalledWith({ id: 'user_id' }, 'singhprojectkey', { expiresIn: 259200 });
    expect(res.cookie).toHaveBeenCalledWith('jwt', token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ user: 'user_id', created: true });
  });

  test('handles login errors', async () => {
    req.body.username = 'invalid_username';
    req.body.password = 'invalid_password';
    const error = new Error('Invalid credentials');

    userModel.login.mockRejectedValue(error);

    await login(req, res, next);

    expect(userModel.login).toHaveBeenCalledWith('invalid_username', 'invalid_password');
    expect(res.json).toHaveBeenCalledWith({ created: false, errors: { username: "", password: "" } });
  });
});
