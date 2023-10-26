import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CreateRepo from "../../../../../../src/screens/Dashboard/Admin/Create/createRepo/CreateRepo";
import api from "../../../../../../src/network/api";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { ERROR_CODE_NOT_FOUND, ERROR_CODE_BAD_REQUEST, ERROR_CODE_INTERNAL_SERVER_ERROR } from "../../../../../../src/screens/Dashboard/error-Code";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

// Mock the API module
jest.mock("../../../../../../src/network/api");

describe("CreateRepo Component", () => {
  test("it renders the CreateRepo component", () => {
    render(<CreateRepo />);
  });

  test("it handles form submission with valid data", async () => {
    api.post.mockResolvedValue({});

    render(<CreateRepo />);

    fireEvent.change(screen.getByTestId("name-input"), {
      target: { value: "Test Repo" },
    });
    fireEvent.change(screen.getByTestId("description-input"), {
      target: { value: "Test Description" },
    });

    // Trigger form submission
    fireEvent.click(screen.getByTestId("submit-button"));
  });

  test("it handles closing of form", async () => {
    api.post.mockResolvedValue({});

    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    render(<CreateRepo />);

    fireEvent.click(screen.getByTestId("close"));
  });

  test('it handles form submission with a bad request error', async () => {

    const api = require('../../../../../../src/network/api');
    api.default.post.mockRejectedValue({ response: { status: ERROR_CODE_BAD_REQUEST } });


    render(<CreateRepo />);
  
    fireEvent.change(screen.getByTestId('name-input'), {
      target: { value: 'Test Repo' },
    });
    fireEvent.change(screen.getByTestId('description-input'), {
      target: { value: 'Test Description' },
    });
  
    // Trigger form submission
    fireEvent.click(screen.getByTestId('submit-button'));
  
   
  });

  test('it handles form submission with a ERROR_CODE_NOT_FOUND error', async () => {

    const api = require('../../../../../../src/network/api');
    api.default.post.mockRejectedValue({ response: { status: ERROR_CODE_NOT_FOUND } });


    render(<CreateRepo />);
  
    fireEvent.change(screen.getByTestId('name-input'), {
      target: { value: 'Test Repo' },
    });
    fireEvent.change(screen.getByTestId('description-input'), {
      target: { value: 'Test Description' },
    });
  
    // Trigger form submission
    fireEvent.click(screen.getByTestId('submit-button'));
  
  });

  test('it handles form submission with a ERROR_CODE_INTERNAL_SERVER_ERROR error', async () => {

    const api = require('../../../../../../src/network/api');
    api.default.post.mockRejectedValue({ response: { status: ERROR_CODE_INTERNAL_SERVER_ERROR } });


    render(<CreateRepo />);
  
    fireEvent.change(screen.getByTestId('name-input'), {
      target: { value: 'Test Repo' },
    });
    fireEvent.change(screen.getByTestId('description-input'), {
      target: { value: 'Test Description' },
    });
  
    // Trigger form submission
    fireEvent.click(screen.getByTestId('submit-button'));
  
    
  });

  test('it handles form submission with missing name', async () => {
    render(<CreateRepo />);
  
    // Leave the name input empty
    fireEvent.change(screen.getByTestId('description-input'), {
      target: { value: 'Test Description' },
    });
  
    // Trigger form submission
    fireEvent.click(screen.getByTestId('submit-button'));
  })




});
