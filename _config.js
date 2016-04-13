var config = {};

config.mongoURI = {
  //development: 'mongodb://admin:password@ds011790.mlab.com:11790/todo',
  development: 'mongodb://localhost/node-dev',
  test: 'mongodb://localhost/node-test'
};

module.exports = config;