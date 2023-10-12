import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import PmReadNew from '../../../../src/screens/Dashboard/PM/PmReadNew';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import rootReducer from '../../../../src/redux/redux-store/reducers';
import '@testing-library/jest-dom';


const store = createStore(rootReducer);

describe('PmReadNew Component', () => {

  it('renders PmReadNew component without errors', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PmReadNew />
        </MemoryRouter>
      </Provider>
    );
  });



   it('calls handleSearchChange when the search input value changes', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <PmReadNew />
        </MemoryRouter>
      </Provider>
    );

    const searchInput = getByPlaceholderText('Search PM...');
    fireEvent.change(searchInput, { target: { value: 'John' } });

  });

  it('calls handlePaginate when the pagination buttons are clicked', () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <PmReadNew />
        </MemoryRouter>
      </Provider>
    );
  
   
    waitFor(() => {
        fireEvent.click(getByText('1'));
    });

    waitFor(() => {
        expect(handlePaginate).toHaveBeenCalledWith(1);
    });

    waitFor(() => {
        fireEvent.click(getByText('2'));
    });

    waitFor(() => {
        expect(handlePaginate).toHaveBeenCalledWith(2);
    });
   

  });
  

  it('navigates to Add Github UserName when the corresponding button is clicked', () => {
    const { getByText, history } = render(
      <Provider store={store}>
        <MemoryRouter>
          <PmReadNew />
        </MemoryRouter>
      </Provider>
    );

    const addUserNameButton = getByText('Add Github UserName');
    fireEvent.click(addUserNameButton);

  });

  it('navigates to Create PM when the Create PM button is clicked', () => {
    const { getByText, history } = render(
      <Provider store={store}>
        <MemoryRouter>
          <PmReadNew />
        </MemoryRouter>
      </Provider>
    );

    const createPmButton = getByText('Create PM');
    fireEvent.click(createPmButton);

  });

    
});
