
import { apiVersion} from "../../../src/network/config";
import "@testing-library/jest-dom";
  
  describe('Config Constants', () => {
  
  
    it('should have the correct apiVersion', () => {
      expect(apiVersion).toBe('api/v1');
    });
  
  
  });
  