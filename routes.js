const express = require("express");

const UserController = require('./controllers/UserController.js');

const routes = express.Router();

routes.get('/', (req, res) => {
  return res.send('Ajude-me API is alive!');
});

routes.use((req, res, next) => {
  console.log('passouw por min')
  next();
}); 

routes.get('/user', UserController.index);
routes.post('/user', UserController.create);
routes.put('/user/:id', UserController.update);
routes.delete('/user/:id', UserController.delete);

module.exports = routes;