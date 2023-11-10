
import { API_VERSION} from "../../../src/network/config";
import "@testing-library/jest-dom";
  
  describe('Config Constants', () => {
  
  
    it('should have the correct API_VERSION', () => {
      expect(API_VERSION).toBe('api/v1');
    });
  
  
  });
  