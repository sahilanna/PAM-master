
import {  ngrokUrl, ngrokUrlSwe,ngrokLogin,apiVersion} from "../../../src/network/config";
import "@testing-library/jest-dom";
  
  describe('Config Constants', () => {
    it('should have the correct ngrokUrl', () => {
      expect(ngrokUrl).toBe('254d-106-51-70-135.ngrok-free.app/api/v1');
    });
  
    it('should have the correct ngrokUrlSwe', () => {
      expect(ngrokUrlSwe).toBe('dbeb-106-51-70-135.ngrok-free.app');
    });
  
    it('should have the correct ngrokLogin', () => {
      expect(ngrokLogin).toBe('254d-106-51-70-135.ngrok-free.app');
    });
  
    it('should have the correct apiVersion', () => {
      expect(apiVersion).toBe('api/v1');
    });
  
  
  });
  