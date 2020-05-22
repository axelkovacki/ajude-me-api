const Home = require('../models/Home.js');

module.exports = {
  async index(request, response) {
    const data = await Home.get();

    if(!data) {
      return response.status(404).json({ error: 'No data!'});
    }

    return response.json(data);
  },

  async create(request, response) {  
    const { name, lead, image } = request.body

    const newData = await Home.create({
      name,
      lead,
      image
    })
      
    return response.json(newData)
  }
}