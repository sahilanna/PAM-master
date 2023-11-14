import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider, useNavigate } from "react-redux";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import rootReducer from "../../../../src/redux/reduxStore/reducers";
import UserCreate from "../../../../src/screens/Dashboard/Users/userCreate";
import { createUser } from "../../../../src/redux/reduxStore/actions/action";
import { useDispatch} from "react-redux";


jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => jest.fn(),
  }));
  
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => jest.fn(),
  }));

const store = createStore(rootReducer);

describe("UserCreate Component", () => {
    test('renders UserCreate component without errors', () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <UserCreate/>
          </MemoryRouter>
        </Provider>
      );
    });

    it('calls onClose when the close button is clicked', () => {
      const { getByText } = render(
        <Provider store={store}>
          <MemoryRouter>
            <UserCreate />
          </MemoryRouter>
        </Provider>
      );

      const closeButton = getByText('X');
      fireEvent.click(closeButton);
    });

    it('does not call handleSubmit when the form is submitted with missing inputs', async () => {
      const { getByText } = render(
        <Provider store={store}>
          <MemoryRouter>
            <UserCreate/>
          </MemoryRouter>
        </Provider>
      );

      const submitButton = getByText('Submit');
      fireEvent.click(submitButton);

    });

    it('calls handleSubmit when the form is submitted with valid inputs', async () => {
      const {  getByText, getByTestId } = render(
        <Provider store={store}>
          <MemoryRouter>
            <UserCreate />
          </MemoryRouter>
        </Provider>
      );

      const nameInput = getByTestId('User-Input');
      const emailInput = getByTestId('Email-ID');
      waitFor(() => {
          fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      });

      waitFor(() => {
          fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
      });

      const submitButton = getByText('Submit');
      fireEvent.click(submitButton);
    });

  it("updates name and email state when input values change", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <UserCreate />
        </MemoryRouter>
      </Provider>
    );

    const nameInput = getByTestId("User-Input");
    const emailInput = getByTestId("Email-ID");

    waitFor(() => {
      fireEvent.change(nameInput, { target: { value: "John Doe" } });
    });

    waitFor(() => {
      fireEvent.change(emailInput, {
        target: { value: "johndoe@example.com" },
      });
    });

    waitFor(() => {
        expect(nameInput.value).toBe("John Doe");
      });

      waitFor(() => {
        expect(emailInput.value).toBe("johndoe@example.com");
      });
  
    
  });

it('calls dispatchUser and navigate when the form is submitted with valid inputs', async () => {
    const dispatchMock = jest.fn();
    const navigateMock = jest.fn();

    jest.spyOn(require("react-redux"), "useDispatch").mockReturnValue(dispatchMock);
    jest.spyOn(require("react-router-dom"), "useNavigate").mockReturnValue(navigateMock);

    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <UserCreate />
        </MemoryRouter>
      </Provider>
    );

    const nameInput = getByTestId("User-Input");
    const emailInput = getByTestId("Email-ID");
    const submitButton = getByText('Submit');

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "johndoe@example.com" } });
    fireEvent.click(submitButton);

    waitFor(() => {
        expect(dispatchMock).toHaveBeenCalledWith(createUser({ name: "John Doe", email: "johndoe@example.com", enumRole: 3 }));
    })
    
    waitFor(() => {
        expect(navigateMock).toHaveBeenCalledWith('/userRead');
    })
    
  });

});
