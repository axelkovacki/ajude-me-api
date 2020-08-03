const connection = require('../database');

module.exports = { 
  async index(request, response) {
    const { user } = request.contents;

    let data = await connection('solicitations')
      .select(
        'users.name',
        'users.phone',
        'users.adress',
        'solicitations.id',
        'solicitations.credit',
        'solicitations.description',  
      )
      .join('users', 'users.id', '=', 'solicitations.user_id')
      .where('solicitations.status', 1)
      .where(builder => {
        if (user.type == 3) {
          builder.where('solicitations.user_id', '=', user.id);
        }
      })
      .orderBy('solicitations.id', 'DESC');

    return response.json(data);
  },

  async show(request, response) {
    const { id } = request.params

    const data = await connection('solicitations').where('id', id).first();
    
    return response.json(data);
  },

  async create(request, response) {
    const { user } = request.contents;
    const { body } = request;

    if (user.type !== 1) {
      return response.status(400).json({ error: 'User unauthorized to create a Solicitation!' });
    }

    const data = await connection('solicitations').insert({
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

    if (user.type !== 1) {
      return response.status(400).json({ error: 'User not Unauthorized to update a Solicitation!' });
    }

    const data = await connection('solicitations').where('id', id).where('user_id', user.id).update({
      description: body.description,
      credit: body.credit,
      status: body.status
    });

    return response.json(data);
  }
}