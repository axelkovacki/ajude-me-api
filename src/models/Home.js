// Get the connection of database.
const connection = require('../../database');

// Get the 'model/schema' of home.
const Home = connection('home');

// Create the functions you need.
const get = async () => {
  try {
    // Code here.
  
    return await Home;
  } catch(err) {
    throw new Error(err);
  }
};

const create = async (data) => {
  try {
    // Code here.
  
    return await Home.insert(data);
  } catch(err) {
    throw new Error(err);
  }
};

module.exports = {
  get,
  create
}
