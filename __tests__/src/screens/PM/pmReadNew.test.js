import React from 'react';
import { render, fireEvent, act, screen } from '@testing-library/react';
import PmReadNew from '../../../../src/screens/Dashboard/PM/PmReadNew';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import rootReducer from '../../../../src/redux/redux-store/reducers';
import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ngrokUrl } from '../../../../src/network/config';
import api from '../../../../src/network/api';

const store = createStore(rootReducer);
jest.mock('.../../../../src/network/api');
jest.useFakeTimers();
describe('PmReadNew Component', () => {

  // const mockData = [
  //   { id: 1, name: 'PM 1', email: 'pm1@example.com' },
  //   { id: 2, name: 'PM 2', email: 'pm2@example.com' },

  // ];

  // beforeEach(() => {
  //   api.get.mockResolvedValue({ data: mockData });
  // });

  it('should call handleViewDetails when the view button is clicked', async () => {

    const mockData = [
      {
        id: 402,
        name: "Sahil Mehar",
        email: "sahil.mehar@nineleaps.com",
        enumRole: "PROJECT_MANAGER",
        gitHubUsername: null,
        lastUpdated: "2023-10-11T16:31:31",
        lastLogout: "2023-10-11T16:35:11",
      },
      {
        id: 4043,
        name: "Sahil Mear",
        email: "sahil.mehar@nineleaps.com",
        enumRole: "PROJECT_MANAGER",
        gitHubUsername: null,
        lastUpdated: "2023-10-11T16:31:31",
        lastLogout: "2023-10-11T16:35:11",
      },
    ]
    const mockResponse={
      data:mockData
    }

       
    api.get.mockResolvedValue({ data: mockData });

   
     render(
      
      <MemoryRouter>
        <PmReadNew
        
      />
      </MemoryRouter>
      
    );
    await act(async () => {
      expect(screen.getByText("Sahil Mehar"))
    })
 
      console.log(
        screen.debug()
      )
  
    // fireEvent.change(screen.getByPlaceholderText("Search PM..."), { target: { value: "Sahil" } });
    // const viewButtons = screen.getAllByTestId('view-details'); 

  
  })




  // it('renders PmReadNew component without errors', () => {
  //   render(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <PmReadNew />
  //       </MemoryRouter>
  //     </Provider>
  //   );
  // });



  //  it('calls handleSearchChange when the search input value changes', () => {
  //   const { getByPlaceholderText } = render(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <PmReadNew />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   const searchInput = getByPlaceholderText('Search PM...');
  //   fireEvent.change(searchInput, { target: { value: 'John' } });

  // });

  // it('calls handlePaginate when the pagination buttons are clicked', () => {
  //   const { getByText } = render(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <PmReadNew />
  //       </MemoryRouter>
  //     </Provider>
  //   );
  
   
  //   waitFor(() => {
  //       fireEvent.click(getByText('1'));
  //   });

  //   waitFor(() => {
  //       expect(handlePaginate).toHaveBeenCalledWith(1);
  //   });

  //   waitFor(() => {
  //       fireEvent.click(getByText('2'));
  //   });

  //   waitFor(() => {
  //       expect(handlePaginate).toHaveBeenCalledWith(2);
  //   });
   

  // });
  

  // it('navigates to Add Github UserName when the corresponding button is clicked', () => {
  //   const { getByText, history } = render(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <PmReadNew />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   const addUserNameButton = getByText('Add Github UserName');
  //   fireEvent.click(addUserNameButton);

  // });

  // it('navigates to Create PM when the Create PM button is clicked', () => {
  //   const { getByText, history } = render(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <PmReadNew />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   const createPmButton = getByText('Create PM');
  //   fireEvent.click(createPmButton);

  // });

    

    
});
