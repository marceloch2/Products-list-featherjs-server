const users = require('./users/users.service.js');
const auth = require('./auth/auth.service.js');
const products = require('./products/products.service.js');

module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(auth);
  app.configure(products);
};
