const environment = process.env.NODE_ENV || 'development';

if (environment === 'development') {
  module.exports = require('./dev');
} else {
  module.exports = require('./prod');
}
