const express = require("express");

const HomeController = require('./controllers/HomeController.js');

const routes = express.Router();

routes.get('/', (req, res) => {
  return res.send('Ajude-me API is alive!');
});

// Tests endpoints
routes.get('/home', HomeController.index);
routes.post('/home', HomeController.create);

module.exports = routes;