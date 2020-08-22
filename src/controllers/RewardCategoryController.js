const connection = require('../database'); 

module.exports = { 
  async index(request, response) {

    const data = await connection('reward_categories')
      .select(
        'id',
        'name',
      )
      .where('status', 1);
  
    return response.json(data);
  }
}