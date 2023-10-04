const winston = require('winston');

// Defining log levels 
const logLevels = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  verbose: 'blue',
  debug: 'magenta',
};

// Creating a logger with custom log levels and colors
const logger = winston.createLogger({
  levels: logLevels,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(),
   
  ],
});

module.exports = logger;
