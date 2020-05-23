const connection = require('../database'); 

module.exports = { 
  async index(request, response) {
    const data = await connection('users');
    
    return response.json(data);
  },

  async create(request, response) {
    const body = request.body;

    if (body.password) {
      body.password = md5(body.password);
    }

    const data = await connection('users').insert(body);

    return response.json(data);
  },

  async login(request, response) {
    const { username, password } = request.body;

    const data = await connection('users')
      .where('username', username)
      .where('password', md5(password))
      .first();

    if (!data) {
      return response.status(400).json(data);
    }

    return response.json(data);
  },
  
  async delete(request, response) {
    const { id } = request.params

    const data = await connection('users').where('id', id).del();
    
    return response.json(data);
  }
}