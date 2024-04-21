// backend/tests/AuthController.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index'); 

let mongoServer;
// At the top of your test file
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'mocked_token')
}));

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterEach(async () => {
  await mongoose.connection.dropDatabase();
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Authentication API", () => {
  test("should register a new user", async () => {
    const newUser = {
      username: "newuser",
      password: "password123",
      name: "New User",
      email: "newuser@example.com"
    };

    const response = await request(app)
      .post("/register")
      .send(newUser);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('user');
  });

  test("should not register a user with existing username", async () => {
    const userData = {
      username: "existinguser",
      password: "password123",
      name: "Existing User",
      email: "existinguser@example.com"
    };

    // Simulate existing user
    await request(app).post("/register").send(userData);

    // Attempt to register the same user again
    const response = await request(app)
      .post("/register")
      .send(userData);

    expect(response.statusCode).toBe(401);
    expect(response.body.errors).toHaveProperty('username');
  });

  test("should not register a user with invalid email", async () => {
    const userData = {
      username: "newuser",
      password: "password123",
      name: "New User",
      email: "invalidemail" // Invalid email format
    };

    const response = await request(app)
      .post("/register")
      .send(userData);

    expect(response.statusCode).toBe(401);
    expect(response.body.errors).toHaveProperty('email');
  });

  test("should not register a user with short password", async () => {
    const userData = {
      username: "newuser",
      password: "short", // Too short
      name: "New User",
      email: "user@example.com"
    };

    const response = await request(app)
      .post("/register")
      .send(userData);

    expect(response.statusCode).toBe(401);
    expect(response.body.errors).toHaveProperty('regpassword');
  });

  test("should login the user", async () => {
    const userData = {
      username: "loginuser",
      password: "password123",
      name: "Login User",
      email: "loginuser@example.com"
    };

    // First register the user
    await request(app).post("/register").send(userData);

    // Login with the registered data
    const loginResponse = await request(app)
      .post("/login")
      .send({
        username: userData.username,
        password: userData.password
      });

    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body).toHaveProperty('token');
  });

  test("should fail login with incorrect username", async () => {
    const userData = {
      username: "validuser",
      password: "validpassword123",
      name: "Valid User",
      email: "valid@example.com"
    };

    // First register the user
    await request(app).post("/register").send(userData);

    // Try to login with an incorrect username
    const loginResponse = await request(app)
      .post("/login")
      .send({
        username: "invalidusername",
        password: "validpassword123"
      });

    expect(loginResponse.statusCode).toBe(401);
    expect(loginResponse.body.errors).toHaveProperty('username');
  });

  test("should fail login with incorrect password", async () => {
    const userData = {
      username: "validuser",
      password: "validpassword123",
      name: "Valid User",
      email: "valid@example.com"
    };

    // First register the user
    await request(app).post("/register").send(userData);

    // Try to login with an incorrect password
    const loginResponse = await request(app)
      .post("/login")
      .send({
        username: "validuser",
        password: "invalidpassword"
      });

    expect(loginResponse.statusCode).toBe(401);
    expect(loginResponse.body.errors).toHaveProperty('password');
  });
});
