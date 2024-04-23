const { profile,getProfile } = require('../Controllers/AuthControllers');
const clientInfo = require('../models/ClientInfo');
const jwt = require('jsonwebtoken');

// Mock request and response objects
const mockReq = {
  body: {
  },
  cookies: {
    jwt: 'valid_jwt_token'
  }
};

const mockRes = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
};

jest.mock('../models/clientInfo', () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  find: jest.fn(),
}));

// Mock jwt.verify
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn().mockReturnValue({ id: 'user_id' })
}));

describe('profile controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 and message for empty request', async () => {
    await profile(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "Empty request" });
  });

  it('should update profile if profile exists', async () => {
    const mockReq = {
      body: {
        fullname: 'John Doe',
        address1: '123 Main St',
        address2: '',
        city: 'City',
        state: 'State',
        zipcode: '12345'
      },
      cookies: {
        jwt: 'valid_jwt_token'
      }
    };
    const existingProfile = { user: 'user_id', fullname: 'Old Name', address1: 'Old Address' };
    const updatedProfile = { ...existingProfile, ...mockReq.body };
  
    // Mock findOne to resolve with existing profile
    clientInfo.findOne.mockResolvedValue(existingProfile);
  
    // Create a mock instance of the model with a mocked save method
    
    const mockInstance = {
      ...existingProfile,
      save: jest.fn().mockResolvedValue(updatedProfile)
    };
    
    // Mock the model constructor to return the mock instance
    clientInfo.findOne.mockReturnValue(mockInstance);
    
  
    // Call profile controller with mock request and response
    await profile(mockReq, mockRes);
  
    // Verify that findOne was called with the correct parameters
    expect(clientInfo.findOne).toHaveBeenCalledWith({ user: 'user_id' });
  
    // Verify that the save method was called on the mock instance
    expect(mockInstance.save).toHaveBeenCalled();
  
    // Verify the response status and JSON
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({ created: false, profile: updatedProfile, updated: true });
  });  
  
  it('should return 400 if fullname is empty', async () => {
    const mockReq = {
      body: {
        // Empty fullname
        fullname: '',
        address1: '123 Main St',
        address2: '',
        city: 'City',
        state: 'State',
        zipcode: '12345'
      },
      cookies: {
        jwt: 'valid_jwt_token'
      }
    };
  
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  
    // No need to mock findOne or save in this scenario
  
    // Call profile controller with mock request and response
    await profile(mockReq, mockRes);
  
    // Verify that the response status is set to 400 (Bad Request)
    expect(mockRes.status).toHaveBeenCalledWith(400);
  
    // Verify that the response JSON contains an error message
    expect(mockRes.json).toHaveBeenCalledWith({ fullname: 'Fullname is required' });
  });

  it('should return 400 if address1 is empty', async () => {
    const mockReq = {
      body: {
        // Empty fullname
        fullname: 'john doe',
        address1: '',
        address2: '',
        city: 'City',
        state: 'State',
        zipcode: '12345'
      },
      cookies: {
        jwt: 'valid_jwt_token'
      }
    };
  
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  
    // No need to mock findOne or save in this scenario
  
    // Call profile controller with mock request and response
    await profile(mockReq, mockRes);
  
    // Verify that the response status is set to 400 (Bad Request)
    expect(mockRes.status).toHaveBeenCalledWith(400);
  
    // Verify that the response JSON contains an error message
    expect(mockRes.json).toHaveBeenCalledWith({ address1: 'Address is required' });
  });

  it('should return 400 if city is empty', async () => {
    const mockReq = {
      body: {
        // Empty fullname
        fullname: 'john doe',
        address1: '123 main street',
        address2: '',
        city: '',
        state: 'State',
        zipcode: '12345'
      },
      cookies: {
        jwt: 'valid_jwt_token'
      }
    };
  
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  
    // No need to mock findOne or save in this scenario
  
    // Call profile controller with mock request and response
    await profile(mockReq, mockRes);
  
    // Verify that the response status is set to 400 (Bad Request)
    expect(mockRes.status).toHaveBeenCalledWith(400);
  
    // Verify that the response JSON contains an error message
    expect(mockRes.json).toHaveBeenCalledWith({ city: 'City is required' });
  });

  it('should return 400 if state is empty', async () => {
    const mockReq = {
      body: {
        // Empty fullname
        fullname: 'john doe',
        address1: '123 main street',
        address2: '',
        city: 'city',
        state: '',
        zipcode: '12345'
      },
      cookies: {
        jwt: 'valid_jwt_token'
      }
    };
  
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  
    // No need to mock findOne or save in this scenario
  
    // Call profile controller with mock request and response
    await profile(mockReq, mockRes);
  
    // Verify that the response status is set to 400 (Bad Request)
    expect(mockRes.status).toHaveBeenCalledWith(400);
  
    // Verify that the response JSON contains an error message
    expect(mockRes.json).toHaveBeenCalledWith({ state: 'State is required' });
  });

  it('should return 400 if zipcode is empty', async () => {
    const mockReq = {
      body: {
        // Empty fullname
        fullname: 'john doe',
        address1: '123 main street',
        address2: '',
        city: 'city',
        state: 'State',
        zipcode: ''
      },
      cookies: {
        jwt: 'valid_jwt_token'
      }
    };
  
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  
    // No need to mock findOne or save in this scenario
  
    // Call profile controller with mock request and response
    await profile(mockReq, mockRes);
  
    // Verify that the response status is set to 400 (Bad Request)
    expect(mockRes.status).toHaveBeenCalledWith(400);
  
    // Verify that the response JSON contains an error message
    expect(mockRes.json).toHaveBeenCalledWith({ zipcode: 'Zipcode is required' });
  });

  it('should create profile if profile does not exist', async () => {
    const mockReq = {
      body: {
        fullname: 'John Doe',
        address1: '123 Main St',
        address2: '',
        city: 'City',
        state: 'State',
        zipcode: '12345'
      },
      cookies: {
        jwt: 'valid_jwt_token'
      }
    };
    
    clientInfo.findOne.mockResolvedValue(null);
    const createdProfile = { user: 'user_id', ...mockReq.body };
    clientInfo.create.mockResolvedValue(createdProfile);

    await profile(mockReq, mockRes);

    expect(clientInfo.findOne).toHaveBeenCalledWith({user: 'user_id'});
    expect(clientInfo.create).toHaveBeenCalledWith({ user: 'user_id', ...mockReq.body });
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({ created: true, profile: createdProfile, updated: false });
  });

  it('should return 200 and all profiles', async () => {
    const mockProfiles = [
      { user: 'user1', fullname: 'John Doe' },
      { user: 'user2', fullname: 'Jane Doe' },
    ];

    // Mock clientInfo.find to resolve with an array of profiles
    clientInfo.find.mockResolvedValue(mockProfiles);

    const mockReq = {
      body: {
      },
      cookies: {
        jwt: 'valid_jwt_token'
      }
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getProfile(mockReq, mockRes);

    // Verify that clientInfo.find was called with an empty query object ({})
    expect(clientInfo.find).toHaveBeenCalledWith({});

    // Verify that the response status is set to 200
    expect(mockRes.status).toHaveBeenCalledWith(200);

    // Verify that the response JSON includes all profiles
    expect(mockRes.json).toHaveBeenCalledWith({
      profiles: mockProfiles,
    });
  });
  it('should return 401 if profile update fails', async () => {
    // Mock that an error occurs during the profile update process
    const mockReq = {
      body: {
        fullname: 'John Doe',
        address1: '123 Main St',
        address2: '',
        city: 'City',
        state: 'State',
        zipcode: '12345'
      },
      cookies: {
        jwt: 'valid_jwt_token'
      }
    };
    clientInfo.findOne.mockResolvedValue({ user: 'user_id' });

    // Create a mock instance with a mocked save method
    const mockInstance = {
      user: 'user_id',
      save: jest.fn().mockRejectedValue(new Error('Database error')), // Simulate error
    };

    // Mock the model constructor to return the mock instance
    clientInfo.findOne.mockReturnValue(mockInstance);
  
    // Call profile controller with mock request and response
    await profile(mockReq, mockRes);
  
    // Verify that the response status is set to 401
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "profile updation fail" });
  });
  
});
