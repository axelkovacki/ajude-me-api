const connection = require('../database'); 

module.exports = { 
  async index(request, response) {
    const data = await connection('rewards').where('status', 1);
    
    return response.json(data);
  },

  async show(request, response) {
    const { id } = request.params

    const data = await connection('rewards').where('id', id).first();
    
    return response.json(data);
  },

  async create(request, response) {
    const { user } = request.contents;
    const { body } = request;

    if (user.type !== 2) {
      return response.status(400).json({ error: 'User not Unauthorized to create a Reward!' });
    }

    const data = await connection('rewards').insert({
      ...body,
      user_id: user.id,
      status: 1
    });

    return response.json(data);
  },

  async update(request, response) {
    const { id } = request.params;
    const { user } = request.contents;
    const { body } = request;

    if (user.type !== 2) {
      return response.status(400).json({ error: 'User not Unauthorized to update a Reward!' });
    }

    const data = await connection('rewards').where('id', id).where('user_id', user.id).update(body);

    return response.json(data);
  }
}