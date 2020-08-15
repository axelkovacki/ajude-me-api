function start() {
  try {
    const express = require('express');
    const path = require('path');
    const cors = require('cors');
    
    const routes = require('./routes');
    
    const app = express();

    app.use(cors());
    app.use(express.static(path.join(__dirname, 'assets/webapp')));
    app.use(express.json());
    app.use(routes);
    
    app.listen(process.env.PORT || 3333);
    
    console.log(`> Server start in ${process.env.PORT || 3333} port!`);
  } catch(err) {
    throw new Error(err);
  }
}

start();