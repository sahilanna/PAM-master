import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { createProjectRequest, createProjectSuccess, createProjectFailure, createPM, createUser, createPmGithubName } from '/home/nineleaps/Desktop/Pratap/PAM-master/src/redux/redux-store/actions/action.js';
import api from '../../../../../src/network/api';

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
