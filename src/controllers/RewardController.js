const connection = require('../database'); 

module.exports = { 
  async index(request, response) {
    const { user } = request.contents;
    const { category_id } = request.query;

    const data = await connection('rewards')
      .select(
        'users.id as userId',
        'users.name',
        'users.phone',
        'users.address',
        'users.instagram',
        'users.facebook',
        'rewards.id',
        'rewards.category_id',
        'rewards.credit',
        'rewards.title',
        'rewards.description',
        'rewards.link'
      )
      .join('users', 'users.id', '=', 'rewards.user_id')
      .where(builder => {
        if (user.type == 2) {
          builder.where('rewards.user_id', '=', user.id);
        }

        if (category_id) {
          builder.where('rewards.category_id', '=', category_id);
        }
      })
      .where('rewards.status', 1)
      .orderBy('rewards.credit', 'ASC');
  
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

    const data = await connection('rewards').where('id', id).where('user_id', user.id).update({
      category_id: body.category_id,
      title: body.title,
      description: body.description,
      link: body.link,
      credit: body.credit,
      status: body.status
    });

    return response.json(data);
  }
}