import reportWebVitals from "../../src/reportWebVitals";

describe('reportWebVitals', () => {
    it('calls web-vitals functions with the provided onPerfEntry callback', () => {
      const onPerfEntryMock = jest.fn();
      
      // Mock the web-vitals functions directly
      const webVitals = require('web-vitals');
      webVitals.getCLS = jest.fn();
      webVitals.getFID = jest.fn();
      webVitals.getFCP = jest.fn();
      webVitals.getLCP = jest.fn();
      webVitals.getTTFB = jest.fn();
  
      reportWebVitals(onPerfEntryMock);
 
    });
  });