// /* eslint-disable no-console */
// const logger = require('winston');
// const app = require('./app');
// const port = app.get('port');
// const server = app.listen(port);

// process.on('unhandledRejection', (reason, p) =>
//   logger.error('Unhandled Rejection at: Promise ', p, reason)
// );

// server.on('listening', () =>
//   logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
// );

// your-app/src/index.js

const logger = require('winston');
const app = require('./app');

const port = app.get('port');

process.on('unhandledRejection', (reason, p) => {
  logger.error('Unhandled Rejection at: Promise ', p, reason);
});

process.on('nuxt:build:done', (err) => {
  if (err) {
    logger.error(err);
  }
  const server = app.listen(port);

  console.log(port)

  server.on('listening', () => {
    logger.info(`Feathers application started on ${app.get('host')}:${port}`);
  });
});