//backend\Coverage\profile.test.js
const httpMocks = require('node-mocks-http');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const clientInfo = require('../models/ClientInfo');
const { profile } = require('../Controllers/AuthControllers');
const validateProfileInput = require('../validation/profile');

jest.mock('../models/userModel');
jest.mock('../models/ClientInfo');
jest.mock('jsonwebtoken');
jest.mock('bcrypt');

describe('Profile Controller Tests', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should update profile with valid input', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/user/profile',
      body: {
        fullname: 'John Doe',
        address1: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zipcode: '90210'
      }
    });
    const res = httpMocks.createResponse();

    jwt.verify.mockReturnValue({ id: '123' });
    clientInfo.findOneAndUpdate.mockResolvedValue({
      fullname: 'John Doe',
      address1: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipcode: '90210',
      isNew: false
    });

    await profile(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getData()).toHaveProperty('profile');
    expect(res._getData().profile.fullname).toBe('John Doe');
  });

  it('should return 400 if validation fails', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/user/profile',
      body: {
        fullname: '',
        address1: '',
        city: '',
        state: '',
        zipcode: ''
      }
    });
    const res = httpMocks.createResponse();

    validateProfileInput.mockImplementation(() => ({
      errors: {
        fullname: 'Fullname is required.',
        address1: 'Address is required',
        city: 'City is required',
        state: 'State is required',
        zipcode: 'Zipcode is required'
      },
      isValid: false
    }));

    await profile(req, res);

    expect(res.statusCode).toBe(400);
    expect(res._getData()).toHaveProperty('fullname', 'Fullname is required.');
  });

});
