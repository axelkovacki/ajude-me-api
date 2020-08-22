const express = require("express");
const path = require("path");

// Middlewares
const AuthenticationMiddleware = require('./middlewares/AuthenticationMiddleware.js');

// Controllers
const UserController = require('./controllers/UserController.js');
const SolicitationController = require('./controllers/SolicitationController.js');
const SolicitationCategoryController = require('./controllers/SolicitationCategoryController.js');
const SolicitationCreditController = require('./controllers/SolicitationCreditController.js');
const RewardController = require('./controllers/RewardController.js');
const RewardCategoryController = require('./controllers/RewardCategoryController.js');
const RewardCreditController = require('./controllers/RewardCreditController.js');

const routes = express.Router();

routes.get('/', (request, response) => response.sendFile(path.join(__dirname, 'assets/webapp', 'index.html')));

routes.post('/user/login', UserController.login);
routes.get('/user', UserController.index);
routes.get('/user/:id', UserController.show);
routes.post('/user', UserController.create);
routes.put('/user/:id', UserController.update);
routes.delete('/user/:id', UserController.delete);

routes.use((request, response, next) => {
  AuthenticationMiddleware(request, response, next);
}); 

routes.get('/solicitations', SolicitationController.index);
routes.get('/solicitations/categories', SolicitationCategoryController.index);
routes.post('/solicitations', SolicitationController.create);
routes.put('/solicitations/:id', SolicitationController.update);
routes.post('/solicitations/:id/credits/donate', SolicitationCreditController.create);

routes.get('/rewards', RewardController.index);
routes.get('/rewards/categories', RewardCategoryController.index);
routes.post('/rewards', RewardController.create);
routes.put('/rewards/:id', RewardController.update);
routes.post('/rewards/:id/credits/take', RewardCreditController.create);

module.exports = routes;
