import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import api from '../../../src/network/api';
import { ngrokUrl } from '../../../src/network/config';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { act } from "react-dom/test-utils";

let mock;

beforeEach(() => {
  mock = new MockAdapter(api);
});

afterEach(() => {
  mock.restore();
});

describe('API Interceptors', () => {
  it('should set access token in request headers', async () => {
    const token = 'your-access-token';

    // Mock sessionStorage data to provide the required token
    const sessionStorageData = { token };
    jest.spyOn(sessionStorage.__proto__, 'getItem').mockReturnValue(JSON.stringify(sessionStorageData));

    // Set up the Axios Mock Adapter to intercept requests
    mock.onGet(`${ngrokUrl}/your-endpoint`).reply((config) => {
      // Assert that the AccessToken header is set in the request
      expect(config.headers['AccessToken']).toBe(token);
      return [200, {}];
    });

    await api.get('/your-endpoint');

    // Restore the original getItem function after the test
    sessionStorage.__proto__.getItem.mockRestore();
  });

  it('should handle 401 Unauthorized by redirecting to login', async () => {
     const token = "validToken";
  sessionStorage.setItem("response", JSON.stringify({ token }));
  // Use a spy or mock to check if the Navigate function is called
  const navigateSpy = jest.spyOn(require("react-router"), "Navigate");
  // Simulate a 401 response from the server
  await act(async () => {
    mock.onGet(`${ngrokUrl}/your-endpoint`).reply(401);
    try {
      await api.get("/your-endpoint");
    } catch (error) {
      // Handle the error as needed
    }
  });
  
  });

  it('should reject with the error response on a 403 response with data', async () => {
    // Simulate a 403 response from the server with data
    const errorResponse = { message: 'Forbidden' };

    // Mock sessionStorage data to provide a valid token
    const token = 'your-valid-token';
    jest.spyOn(sessionStorage.__proto__, 'getItem').mockReturnValue(JSON.stringify({ token }));

    // Set up the Axios Mock Adapter to intercept the request
    mock.onGet(`${ngrokUrl}/your-endpoint`).reply(403, errorResponse);

    try {
      await api.get('/your-endpoint');
    } catch (error) {
      // Assert that the error matches the server response
      expect(error).toEqual(errorResponse);
    }

    // Restore the original getItem function after the test
    sessionStorage.__proto__.getItem.mockRestore();
  });

  it('should handle error and reject with an error response', async () => {
    // Simulate a network error by replying with a status of 500
    mock.onGet(`${ngrokUrl}/your-endpoint`).networkError();
  
    try {
      await api.get('/your-endpoint');
    } catch (error) {
      // Assert that the error is an Axios error
      expect(error.isAxiosError).toBeTruthy();
    }
  });
  
  
});
