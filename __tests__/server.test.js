'use strict';

const supergoose = require('@code-fellows/supergoose');
const { server } = require('../src/server');
const mockRequest = supergoose(server);

describe('---------- SERVER TEST ----------', () => {

  it('Can make a POST request to /signup to create a new user', async () => {
    const response = await mockRequest.post('/signup')
      .send({ username: 'abdallah', password: '12345' });
    expect(response.status).toBe(201);
  });

  it('Middleware function sends a basic header on legitimate credentials', async () => {
    const response = await mockRequest.post('/signin').auth('abdallah', '12345');
    expect(response.status).toBe(201);
  });

  it('Middleware function does not send a basic header on invalid credentials', async () => {
    const response = await mockRequest.post('/signin').auth('abdallah', '54321');
    expect(response.status).toBe(403);
  });

  xit('Can create a new user, then sign into that account again', async () => {
    const request = await mockRequest.post('/signup')
      .send({ username: 'abdallahabukhurma', password: '12345' });
    const response = await mockRequest.post('/signin')
      .send({ username: 'abdallahabukhurma', password: '12345' })
      .auth(request.body.username, 'abdallahabukhurma');
    expect(response.status).toBe(201);
  });

});