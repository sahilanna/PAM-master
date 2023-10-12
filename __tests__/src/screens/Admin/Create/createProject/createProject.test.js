import React from 'react';
import {render, fireEvent, waitFor} from  '@testing-library/react';
import '@testing-library/jest-dom';
import CreateProject from '../../../../../../src/screens/Dashboard/Admin/Create/createProject/CreateProject';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import rootReducer from '../../../../../../src/redux/redux-store/reducers';
import CreateProjectUI from '../../../../../../src/screens/Dashboard/Admin/Create/createProject/createProjectUI';
import { createProject } from '../../../../../../src/redux/redux-store/actions/projectActions';

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => jest.fn(),
  }));
  
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => jest.fn(),
  }));

const store = createStore(rootReducer); 


describe('CreateProject component', () => {
test('renders CreateProject component without errors', () => {
    render(
        <Provider store={store}>
          <MemoryRouter>
            <CreateProject />
          </MemoryRouter>
        </Provider>
      );
  });

  it('calls onClose when the close button is clicked', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CreateProject />
        </MemoryRouter>
      </Provider>
    );

    const closeButton = getByTestId('close');

    fireEvent.click(closeButton);
  });

 it('does not call handleSubmit when the form is submitted with missing inputs', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CreateProject />
        </MemoryRouter>
      </Provider>
    );

    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);
  });

});