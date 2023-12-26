const debug = require('debug')('app');
const app = require('./src/app');
const { connect } = require('./src/services/connection');

const PORT = process.env.PORT || 3000;

connect().then(() => {
  app.listen(PORT, () => {
    debug(`Listening to port ${PORT}...`);
  });
});
