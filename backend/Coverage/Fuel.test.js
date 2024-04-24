const jwt = require('jsonwebtoken');
const { getFuelHistory, getAllFuelHistory } = require('../Controllers/AuthControllers');
const Price = require("../models/pricingModel");

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

jest.mock('../models/pricingModel', () => ({
  find: jest.fn(),
  aggregate: jest.fn(),
}));

describe('getFuelHistory', () => {
  const req = {
    cookies: {
      jwt: 'mockJwtToken',
    },
  };

  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return fuel history', async () => {
    const decodedToken = { id: 'mockUserId' };
    jwt.verify.mockReturnValue(decodedToken);
    const mockHistory = [{ /* mock fuel history */ }];

    Price.find.mockResolvedValue(mockHistory);

    await getFuelHistory(req, res);

    expect(jwt.verify).toHaveBeenCalledWith('mockJwtToken', 'singhprojectkey');
    expect(Price.find).toHaveBeenCalledWith({ user: 'mockUserId' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockHistory);
  });

  test('should handle error', async () => {
    const error = new Error('Mock error');
    jwt.verify.mockImplementationOnce(() => { throw error; });

    await getFuelHistory(req, res);

    expect(jwt.verify).toHaveBeenCalledWith('mockJwtToken', 'singhprojectkey');
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ err: error });
  });
});

describe('getAllFuelHistory', () => {
  const req = {};
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return all fuel history with user details', async () => {
    const mockFuelHistory = [{ /* mock fuel history with user details */ }];
    Price.aggregate.mockResolvedValue(mockFuelHistory);

    await getAllFuelHistory(req, res);

    expect(Price.aggregate).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockFuelHistory);
  });

  test('should handle error', async () => {
    const error = new Error('Mock error');
    Price.aggregate.mockRejectedValue(error);

    await getAllFuelHistory(req, res);

    expect(Price.aggregate).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ err: error });
  });
});
