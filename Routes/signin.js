const router = express.Router();
const pino = require('pino');
const log = pino({ level: process.env.LOG_LEVEL || 'info' });
const expressPino = require('express-pino-logger')({
  logger: pino
})
router.use(expressPino);
