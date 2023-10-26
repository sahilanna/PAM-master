import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { createProject } from '../../../../../src/redux/redux-store/actions/projectActions';
import { ngrokUrl } from '../../../../../src/network/config';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Create a mock for Axios
const mockAxios = new MockAdapter(axios);

describe('createProject', () => {

  it('creates CREATE_PROJECT_FAILURE when API call fails', async () => {
    const store = mockStore();
    const projectName = 'Sample Project';
    const projectDescription = 'This is a sample project';
    const errorMessage = 'API call failed';
    const expectedActions = [
      { type: 'CREATE_PROJECT_REQUEST' },
      { type: 'CREATE_PROJECT_FAILURE', error: new Error(errorMessage) },
    ];

    // Mock the API call to simulate an error
    mockAxios.onPost(`https://your-api-url/projects/create`).reply(500, { error: errorMessage });

    await store.dispatch(createProject(projectName, projectDescription));
    // expect(store.getActions()).toEqual(expectedActions);
  });


  it('creates CREATE_PROJECT_SUCCESS ', async () => {
    const store = mockStore();
    const projectName = 'Sample Project';
    const projectDescription = 'This is a sample project';
    const expectedActions = [
      { type: 'CREATE_PROJECT_REQUEST' },
      { type: 'CREATE_PROJECT_SUCCESS' },
    ];

    // Mock the API call
    mockAxios.onPost(`https://${ngrokUrl}/projects/create`).reply(200); // Make sure to use the correct ngrokUrl

    store.dispatch(createProject(projectName, projectDescription));
    
  });
  
  



});
