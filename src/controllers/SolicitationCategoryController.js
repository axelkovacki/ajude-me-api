const connection = require('../database'); 

module.exports = { 
  async index(request, response) {

    const data = await connection('solicitation_categories')
      .select(
        'id',
        'name',
      )
      .where('status', 1);
  
    return response.json(data);
  }
}