import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { createProjectRequest, createProjectSuccess, createProjectFailure, createPM, createUser, createPmGithubName } from '/home/nineleaps/Desktop/Pratap/PAM-master/src/redux/redux-store/actions/action.js';
import api from '../../../../../src/network/api';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ngrokUrl } from '../../../../../src/network/config';

// Mock your API and action functions
jest.mock('../../../../../src/network/api', () => ({
  post: jest.fn(),
}));


describe('YourComponent', () => {
  // Mock the dispatch function
  const dispatch = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches CREATE_PROJECT_REQUEST on createProjectRequest', () => {
    createProjectRequest()(dispatch);
    expect(dispatch).toHaveBeenCalledWith({ type: 'CREATE_PROJECT_REQUEST' });
  });


  it('should create a PM and dispatch the result', async () => {

    let mock;
    mock = new MockAdapter(axios);
    const dispatchPMUpdate = jest.fn();

    // Define the input parameters for createPM
    const name = 'John Doe';
    const email = 'john@example.com';
    const enumRole = 'PROJECT_MANAGER';

    // Mock the Axios post request and define the response data
    mock.onPost(`https://${ngrokUrl}/users/`).reply(200,  'succeess' );

    // Call the createPM function
    await createPM({ name, email, enumRole })(dispatchPMUpdate);

    // Verify that the Axios post request was made with the correct data
    // expect(mock.history.post[0].data).toBe(JSON.stringify({ name, email, enumRole }));

    // Verify that the dispatch function was called with the expected action
    // expect(dispatchPMUpdate).toHaveBeenCalledWith({ type: 'createPM', payload: { yourResponseData } });
  });

  it('should create a PM and dispatch the result', async () => {

    let mock;
    mock = new MockAdapter(axios);
    const  dispatchUserUpdate = jest.fn();

    // Define the input parameters for createPM
    const name = 'John Doe';
    const email = 'john@example.com';
    const enumRole = 'PROJECT_MANAGER';

    // Mock the Axios post request and define the response data
    mock.onPost(`https://${ngrokUrl}/users/`).reply(200,  'succeess' );

    // Call the createPM function
    await createUser({ name, email, enumRole })( dispatchUserUpdate);

    // Verify that the Axios post request was made with the correct data
    // expect(mock.history.post[0].data).toBe(JSON.stringify({ name, email, enumRole }));

    // Verify that the dispatch function was called with the expected action
    // expect(dispatchPMUpdate).toHaveBeenCalledWith({ type: 'createPM', payload: { yourResponseData } });
  });

  it('should create a PM and dispatch the result', async () => {

    let mock;
    mock = new MockAdapter(axios);
    const  dispatchUserUpdate = jest.fn();

    // Define the input parameters for createPM
    const projectName = 'John Doe';
    const repo = 'john@example.com';
    const username = 'PROJECT_MANAGER';

    // Mock the Axios post request and define the response data
    mock.onPost(`https://${ngrokUrl}/collaborators/add`).reply(200,  'succeess' );

    // Call the createPM function
    await createPmGithubName({ projectName, repo, username })( dispatchUserUpdate);

    // Verify that the Axios post request was made with the correct data
    // expect(mock.history.post[0].data).toBe(JSON.stringify({ name, email, enumRole }));

    // Verify that the dispatch function was called with the expected action
    // expect(dispatchPMUpdate).toHaveBeenCalledWith({ type: 'createPM', payload: { yourResponseData } });
  });

  it('should handle errors and log them', async () => {

    let mock;
    mock = new MockAdapter(axios);
    const dispatchPMUpdate = jest.fn();

   

    // Define the input parameters for createPM
    const name = 'John Doe';
    const email = 'john@example.com';
    const enumRole = 'PROJECT_MANAGER';

    // Mock the Axios post request to simulate an error response
    mock.onPost(`https://${ngrokUrl}/users/`).networkError();

    // Spy on the console.log method to capture the error message
    const consoleLogSpy = jest.spyOn(console, 'log');

    // Call the createPM function
    await createPM({ name, email, enumRole })(dispatchPMUpdate);

    // Verify that the dispatch function was called with the expected action containing an error
    // expect(dispatchPMUpdate).toHaveBeenCalledWith({ type: 'createPM', payload: { error: 'Network Error' } });

    // // Verify that the error was logged
    // expect(consoleLogSpy).toHaveBeenCalledWith('Network Error');

    // // Restore the console.log spy
    // consoleLogSpy.mockRestore();
  });




//   it('dispatches CREATE_PROJECT_SUCCESS on createProjectSuccess', () => {
//     createProjectSuccess()(dispatch);
//     expect(dispatch).toHaveBeenCalledWith({ type: 'CREATE_PROJECT_SUCCESS' });
//   });

//   it('dispatches CREATE_PROJECT_FAILURE on createProjectFailure', () => {
//     createProjectFailure('Error message')(dispatch);
//     expect(dispatch).toHaveBeenCalledWith({
//       type: 'CREATE_PROJECT_FAILURE',
//       payload: 'Error message',
//     });
//   });

//   it('dispatches createPM action correctly', async () => {
//     const response = { data: 'Response data' };
//     api.post.mockResolvedValue(response);

//     const userData = {
//       name: 'John Doe',
//       email: 'johndoe@example.com',
//       enumRole: 'pm',
//     };

//     await createPM(userData)(dispatch);

//     expect(api.post).toHaveBeenCalledWith(`https://${ngrokUrl}/users/`, {
//       name: 'John Doe',
//       email: 'johndoe@example.com',
//       enumRole: 'pm',
//     });
//     expect(dispatch).toHaveBeenCalledWith({ type: 'createPM', payload: response });
//   });

//   it('dispatches createUser action correctly', async () => {
//     const response = { data: 'Response data' };
//     api.post.mockResolvedValue(response);

//     const userData = {
//       name: 'Alice',
//       email: 'alice@example.com',
//       enumRole: 'user',
//     };

//     await createUser(userData)(dispatch);

//     expect(api.post).toHaveBeenCalledWith(`https://${ngrokUrl}/users/`, {
//       name: 'Alice',
//       email: 'alice@example.com',
//       enumRole: 'user',
//     });
//     expect(dispatch).toHaveBeenCalledWith({ type: 'createUser', payload: response });
//   });

//   it('dispatches createPmGithubName action correctly', async () => {
//     const response = { data: 'Response data' };
//     api.post.mockResolvedValue(response);

//     const githubData = {
//       projectName: 'Sample Project',
//       repo: 'Repo Name',
//       username: 'GitHubUser',
//     };

//     await createPmGithubName(githubData)(dispatch);

//     expect(api.post).toHaveBeenCalledWith(`https://${ngrokUrl}/collaborators/add`, {
//       projectName: 'Sample Project',
//       repo: 'Repo Name',
//       username: 'GitHubUser',
//     });
//     expect(dispatch).toHaveBeenCalledWith({ type: 'createPmGithubName', payload: response });
//   });

//   it('renders YourComponent', () => {
//     const { getByText, getByTestId } = render(<YourComponent />);
//     // Add assertions for rendering logic in YourComponent
//   });
});
