import React from 'react';
import { render, screen, fireEvent, getByTestId, getByText } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom'; 
import UserRead from '../../../../src/screens/Dashboard/Users/userRead';
import api from '../../../../src/network/api';
import { ngrokUrl } from '../../../../src/network/config';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';
import rootReducer from '../../../../src/redux/redux-store/reducers';
import '@testing-library/jest-dom';

jest.mock('../../../../src/network/api', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
  delete: jest.fn(() => Promise.resolve()),
}));

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: jest.fn(),
// }));


jest.mock('../../../../src/network/config', () => ({
  ngrokUrl: 'mocked-ngrok-url',
}));

const store = createStore(rootReducer);

describe('UserRead Component', () => {
 

  it('should handle search input and display filtered results', async () => {

    const { getByText, history } = render(
      <Provider store={store}>
        <MemoryRouter>
          <UserRead />
        </MemoryRouter>
      </Provider>
    );
      
    const searchInput = screen.getByPlaceholderText('Search user...');
    fireEvent.change(searchInput, { target: { value: 'TestUser' } });

  });


  it('navigates to Add Github UserName when the corresponding button is clicked', () => {
    const { getByText, history } = render(
      <Provider store={store}>
        <MemoryRouter>
          <UserRead />
        </MemoryRouter>
      </Provider>
    );

    const addUserNameButton = getByText('Add Github UserName');
    fireEvent.click(addUserNameButton);

  });


  it('navigates to Create User when the Create PM button is clicked', () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <UserRead />
        </MemoryRouter>
      </Provider>
    );

    const createPmButton = getByText('Create User');
    fireEvent.click(createPmButton);

  });

  
});
