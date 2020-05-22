const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const ifaces = require('os').networkInterfaces();

function start () {
  try {
    const app = express();
  
    app.use(cors());
    app.use(express.json());
    app.use(routes);
    app.use('/resources', express.static(path.join(__dirname, '../resources').replace('\app.asar', '').replace('/app.asar', '').replace('/\\/', '')));
  
    app.listen(process.env.PORT || 8080);
  
    console.log(`HTTP server start in ${process.env.PORT || 8080} port!`);
  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
}

function getServerAddress (protocol = 'IPv4') {
  try {
    let address;

    Object.keys(ifaces).forEach(dev => {
      ifaces[dev].filter(details => {
        if (details.family === protocol && details.internal === false) {
          address = details.address;
        }
      });
    });
    
    return address;
  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
};

module.exports = {
  start,
  getServerAddress
}