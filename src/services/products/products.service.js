// Initializes the `products` service on path `/products`
const createService = require('feathers-mongodb');
const hooks = require('./products.hooks');
const filters = require('./products.filters');

module.exports = function () {
    const app = this;
    const paginate = app.get('paginate');
    const mongoClient = app.get('mongoClient');
    const options = { paginate };

    // Initialize our service with any options it requires
    app.use('/products', createService(options));

    // Get our initialized service so that we can register hooks and filters
    const service = app.service('products');

    mongoClient.then(db => {
        service.Model = db.collection('products');
    });

    service.hooks(hooks);

    if (service.filter) {
        service.filter(filters);
    }
};
