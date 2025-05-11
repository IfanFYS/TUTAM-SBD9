const winston = require('winston');
const path = require('path');
const fs = require('fs');

// Different logging configuration for production vs development
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'error' : 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'tutam9-backend' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

// Add file transports only in development, not in production (Vercel)
if (process.env.NODE_ENV !== 'production') {
  try {
    const logsDir = path.join(__dirname, 'logs');
    
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    logger.add(new winston.transports.File({
      filename: path.join(logsDir, 'error.log'),
      level: 'error'
    }));
    
    logger.add(new winston.transports.File({
      filename: path.join(logsDir, 'combined.log')
    }));
  } catch (err) {
    console.error('Error setting up file logging:', err);
  }
}

module.exports = logger;
