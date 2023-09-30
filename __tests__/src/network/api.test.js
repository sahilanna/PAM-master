import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import api from '../../../src/network/api';
import "@testing-library/jest-dom";

describe('API Module', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
 
    window.localStorage.clear();
  });

  afterEach(() => {
    mock.restore();
  });

  
  Object.defineProperty(window, 'sessionStorage', {
    value: {
      getItem: jest.fn().mockReturnValue(
        JSON.stringify({ token: 'your-access-token' })
      ),
    },
  });

  it('should set access token in request headers', async () => {
    const accessToken = 'your-access-token';

    mock.onGet('/example').reply((config) => {
     
      expect(config.headers['AccessToken']).toBe(accessToken);
      return [200, {}];
    });

    await api.get('/example');
  });

  it('should handle expired access token and retry', async () => {
    const accessToken = 'your-access-token';

    
    mock.onGet('/example').reply(401);

    
    mock.onAny().replyOnce((config) => {
     
      expect(config.headers['AccessToken']).toBe(accessToken);
      return [200, { newToken: 'new-access-token' }];
    });

    
    mock.onGet('/example').replyOnce(200);

   
    await api.get('/example');

  
    expect(window.localStorage.getItem('AccessToken')).toBe('new-access-token');
  });

  it('should handle other API errors', async () => {
   
    const errorData = { message: 'Forbidden' };
    mock.onGet('/example').reply(403, errorData);

    try {
      await api.get('/example');
    } catch (error) {
      
      expect(error).toEqual(errorData);
    }
  });
});
