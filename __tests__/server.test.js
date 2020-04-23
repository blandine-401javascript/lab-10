'use strict';

const serverObj = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');


const mockRequest = supergoose(serverObj.server);



describe('happy path', () => {
  it('can create a user', async () => {


    let response = await mockRequest.post('/signup-body').send({
      username: 'bUser',
      password: 'bPass',
      fname: 'Bill',
      lname: 'Biggs',
    });

    expect(response.status).toBe(201);

    expect(response.body._id).toBeDefined();


    expect(response.body.password).toBeDefined();
    expect(response.body.password).not.toBe('bPass');
  });

  it('can signin a user', async () => {
    let response = await mockRequest
      .post('/signin')
      .set('Authorization', 'Basic YlVzZXI6YlBhc3M=');




    expect(response.status).toBe(200);

    expect(response.body.username).toBe('bUser');
    expect(response.body.fname).toBe('Bill');
    expect(response.body.lname).toBe('Biggs');
  });
});
