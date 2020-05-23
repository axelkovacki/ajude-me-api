const express = require("express");

const UserController = require('./controllers/UserController.js');
const SolicitationController = require('./controllers/SolicitationController.js');
const SolicitationCreditController = require('./controllers/SolicitationCreditController.js');
const RewardController = require('./controllers/RewardController.js');
const RewardCreditController = require('./controllers/RewardCreditController.js');

const routes = express.Router();

routes.get('/', (req, res) => {
  return res.send('Ajude-me API is alive!');
});

routes.post('/user/login', UserController.login);

routes.use((req, res, next) => {
  console.log('passouw por min')
  next();
}); 

routes.get('/user', UserController.index);
routes.get('/user/:id', UserController.show);
routes.post('/user', UserController.create);
routes.put('/user/:id', UserController.update);
routes.delete('/user/:id', UserController.delete);

routes.get('/solicitations', SolicitationController.index);
routes.post('/solicitations', SolicitationController.create);
routes.put('/solicitations/:id', SolicitationController.update);
routes.post('/solicitations/:id/credits/donate', SolicitationCreditController.create);

routes.get('/rewards', RewardController.index);
routes.post('/rewards', RewardController.create);
routes.put('/rewards/:id', RewardController.update);
routes.post('/rewards/:id/credits/take', RewardCreditController.create);

module.exports = routes;
