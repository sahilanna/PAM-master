import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import {
  createProjectRequest,
  createProjectSuccess,
  createProjectFailure,
  createPM,
  createUser,
  createPmGithubName,
} from "/home/nineleaps/Desktop/Pratap/PAM-master/src/redux/reduxStore/actions/action.js";
import api from "../../../../../src/network/api";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { NGROK_URL } from "../../../../../src/network/config";

// Mock your API and action functions
// jest.mock('../../../../../src/network/api', () => ({
//   post: jest.fn(),
// }));
jest.mock("../../../../../src/network/api");

describe("YourComponent", () => {
  // Mock the dispatch function
  const dispatch = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("dispatches CREATE_PROJECT_REQUEST on createProjectRequest", () => {
    createProjectRequest()(dispatch);
  });

  it("dispatches CREATE_PROJECT_SUCCESS on createProjectSuccess", () => {
    createProjectSuccess()(dispatch);
  });

  it("dispatches CREATE_PROJECT_FAILURE on createProjectFailure", () => {
    createProjectFailure()(dispatch);
  });

  it("should create a PM and dispatch the result", async () => {
    let mock;
    mock = new MockAdapter(axios);
    const dispatchPMUpdate = jest.fn();

    const name = "John Doe";
    const email = "john@example.com";
    const enumRole = "PROJECT_MANAGER";

    mock.onPost(`https://${NGROK_URL}/users/`).reply(200, "succeess");

    await createPM({ name, email, enumRole })(dispatchPMUpdate);
  });

  it("should create a PM and dispatch the result", async () => {
    let mock;
    mock = new MockAdapter(axios);
    const dispatchUserUpdate = jest.fn();

    // Define the input parameters for createPM
    const name = "John Doe";
    const email = "john@example.com";
    const enumRole = "PROJECT_MANAGER";

    // Mock the Axios post request and define the response data
    mock.onPost(`https://${NGROK_URL}/users/`).reply(200, "succeess");

    // Call the createPM function
    await createUser({ name, email, enumRole })(dispatchUserUpdate);
  });

  it("should create a PM and dispatch the result", async () => {
    let mock;
    mock = new MockAdapter(axios);
    const dispatchUserUpdate = jest.fn();

    // Define the input parameters for createPM
    const projectName = "John Doe";
    const repo = "john@example.com";
    const username = "PROJECT_MANAGER";

    // Mock the Axios post request and define the response data
    mock.onPost(`https://${NGROK_URL}/collaborators/add`).reply(200, "succeess");

    // Call the createPM function
    await createPmGithubName({ projectName, repo, username })(
      dispatchUserUpdate
    );
  });

  it("should handle errors and log them", async () => {
    let mock;
    mock = new MockAdapter(axios);
    const dispatchPMUpdate = jest.fn();

    // Define the input parameters for createPM
    const name = "John Doe";
    const email = "john@example.com";
    const enumRole = "PROJECT_MANAGER";

    mock.onPost(`https://${NGROK_URL}/users/`).networkError();

    const consoleLogSpy = jest.spyOn(console, "log");

    // Call the createPM function
    await createPM({ name, email, enumRole })(dispatchPMUpdate);
  });

  it("should create a PM and dispatch the result", async () => {
    let mock;
    mock = new MockAdapter(axios);
    const dispatchPmGithub = jest.fn();

    // Define the input parameters for createPM
    const projectName = "John Doe";
    const repo = "john@example.com";
    const username = "PROJECT_MANAGER";

    // Mock the Axios post request and define the response data
    const api = require("../../../../../src/network/api");
    await api.default.post.mockRejectedValue("Error");

    render(<createPmGithubName />);
  });
});
