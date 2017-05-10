// Initializes the `auth` service on path `/auth`
const createService = require('feathers-mongodb');
const hooks = require('./auth.hooks');
const filters = require('./auth.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/auth', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('auth');

  mongoClient.then(db => {
    service.Model = db.collection('auth');
  });

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
