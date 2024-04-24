const jwt = require('jsonwebtoken');
const { quote } = require('../Controllers/AuthControllers');
const Price = require("../models/pricingModel");

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

jest.mock('../models/pricingModel', () => ({
  create: jest.fn(),
}));

describe('quote', () => {
  const req = {
    cookies: {
      jwt: 'mockJwtToken',
    },
    body: {
      user: 'mockUserId',
      gallonsRequested: 100,
      suggestedPrice: 2.5,
      address: '123 Mock St',
      deliveryDate: '2024-04-24',
      totalPrice: 250,
    },
  };

  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create a quote successfully', async () => {
    const decodedToken = { id: 'mockUserId' };
    jwt.verify.mockReturnValue(decodedToken);

    const mockQuote = { /* mock quote object */ };
    Price.create.mockResolvedValue(mockQuote);

    await quote(req, res);

    expect(jwt.verify).toHaveBeenCalledWith('mockJwtToken', 'singhprojectkey');
    expect(Price.create).toHaveBeenCalledWith({ user: 'mockUserId', ...req.body });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ created: false, quote: mockQuote, updated: true });
  });

  test('should handle error', async () => {
    const error = new Error('Mock error');
    jwt.verify.mockImplementationOnce(() => { throw error; });

    await quote(req, res);

    expect(jwt.verify).toHaveBeenCalledWith('mockJwtToken', 'singhprojectkey');
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ err: error });
  });
});
