
import log from 'loglevel';
import logger from '../../../utils/logger.js';

// Mock the loglevel library for testing
jest.mock('loglevel');

describe('Logger Configuration', () => {
  it('should set the log level to INFO', () => {
    // Verify that log.setLevel is called with log.levels.INFO
    expect(log.setLevel).toHaveBeenCalledWith(log.levels.INFO);
  });

  it('should export the logger instance', () => {
    // Verify that the exported logger is the same as the log instance
    expect(logger).toBe(log);
  });
});
