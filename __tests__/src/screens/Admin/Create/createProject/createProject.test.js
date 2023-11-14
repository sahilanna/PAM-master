import React from 'react';
import {render, fireEvent, waitFor} from  '@testing-library/react';
import '@testing-library/jest-dom';
import CreateProject from '../../../../../../src/screens/Dashboard/Admin/Create/createProject/CreateProject';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import rootReducer from '../../../../../../src/redux/reduxStore/reducers';
import CreateProjectUI from '../../../../../../src/screens/Dashboard/Admin/Create/createProject/createProjectUI';
import { createProject } from '../../../../../../src/redux/reduxStore/actions/projectActions';

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

  it(' call handleSubmit when the form is submitted with proper inputs', async () => {
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CreateProject />
        </MemoryRouter>
      </Provider>
    );

    const projectNameInput = getByTestId('PName');
    fireEvent.change(projectNameInput, { target: { value: 'Test Project' } });

    const projectDescriptionInput = getByTestId('PDesc');
    fireEvent.change(projectDescriptionInput, { target: { value: 'Description of the project' } });

    // Click the submit button
    const submitButton = getByTestId('submit1');
    fireEvent.click(submitButton);

  });



});