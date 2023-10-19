import React from 'react';
import { render, screen, fireEvent, getByTestId, getByText, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom'; 
import UserRead from '../../../../src/screens/Dashboard/Users/userRead';
import api from '../../../../src/network/api';
import { ngrokUrl } from '../../../../src/network/config';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';
import rootReducer from '../../../../src/redux/redux-store/reducers';
import '@testing-library/jest-dom';




jest.mock('../../../../src/network/api');

const store = createStore(rootReducer);

describe('UserRead Component', () => {

  it('should call handleViewDetails when the view button is clicked', async () => {

    const initialState = 
   [
        {
          id: 402,
          name: "Sahil Mehar",
          email: "sahil.mehar@nineleaps.com",
          enumRole: "USER",
          gitHubUsername: null,
          lastUpdated: "2023-10-11T16:31:31",
          lastLogout: "2023-10-11T16:35:11",
        },
        {
          id: 4043,
          name: "Sahil Mear",
          email: "sahil.mear@nineleaps.com",
          enumRole: "USER",
          gitHubUsername: null,
          lastUpdated: "2023-10-11T16:31:31",
          lastLogout: "2023-10-11T16:35:11",
        },
      ];
    const apiMockResponse = {
      data: initialState,
    };

    
  
    const apiMock = require('../../../../src/network/api');
    apiMock.default.get.mockResolvedValue(apiMockResponse);
  
    const { getByText } = render(
      <MemoryRouter>
        <UserRead />
      </MemoryRouter>
    );

  

    await waitFor(() =>{
      const viewIcon = screen.getAllByTestId('view-icon');
      viewIcon.forEach((viewIcon) => {
         fireEvent.click(viewIcon)
         waitFor(() =>{
          const cancel = screen.getByText('Close');
          fireEvent.click(cancel);
         })
      });
    })

    await waitFor(() =>{
      const viewActivity = screen.getAllByTestId('view-activity');
      viewActivity.forEach((viewActivity) => {
         fireEvent.click(viewActivity)
      });
    })
    await waitFor(() =>{
      const deleteButton = screen.getAllByTestId('delete');
      deleteButton.forEach((deleteButton) => {
         fireEvent.click(deleteButton)
         waitFor(() =>{
          const cancel = screen.getByTestId('onClose');
          fireEvent.click(cancel);
          expect(setShowConfirmDialog).toHaveBeenCalledWith(null);
         })
      });
    })
   

  
  })


  it('should call handleViewDetails when the view button is clicked', async () => {

    const initialState = 
   [
        {
          id: 402,
          name: "Sahil Mehar",
          email: "sahil.mehar@nineleaps.com",
          enumRole: "USER",
          gitHubUsername: null,
          lastUpdated: "2023-10-11T16:31:31",
          lastLogout: "2023-10-11T16:35:11",
        },
        {
          id: 4043,
          name: "Sahil Mear",
          email: "sahil.mear@nineleaps.com",
          enumRole: "USER",
          gitHubUsername: null,
          lastUpdated: "2023-10-11T16:31:31",
          lastLogout: "2023-10-11T16:35:11",
        },
      ];
    const apiMockResponse = {
      data: initialState,
    };

    
  
    const apiMock = require('../../../../src/network/api');
    apiMock.default.get.mockResolvedValue(apiMockResponse);

    const deleteUser = jest.fn();
    apiMock.default.delete.mockResolvedValue(apiMockResponse);
  
    const { getByText } = render(
      <MemoryRouter>
        <UserRead />
      </MemoryRouter>
    );

    
    await waitFor(() =>{
      const deleteButton = screen.getAllByTestId('delete');
      deleteButton.forEach((deleteButton) => {
         fireEvent.click(deleteButton)
         waitFor(() =>{
          const confirm = screen.getByTestId('confirm');
          fireEvent.click(confirm);
          expect(deleteUser).toHaveBeenCalledWith(expectedUserId);
         })
      });
    })
   

  
  })
 

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
