const connection = require('../database');
const md5 = require('md5');

module.exports = { 
  async index(request, response) {
    const { type, supporter } = request.query;

    const data = await connection('users')
      .select('id', 'name', 'cpf', 'cnpj', 'phone', 'address', 'image', 'link')
      .where(query => {
        if (type != undefined) {
          query.where('type', '=', type);
        }

        if (supporter != undefined) {
          query.where('supporter', '=', supporter);
        }
      });
    
    return response.json(data);
  },

  async login(request, response) {
    const { email, password } = request.body;

    const data = await connection('users')
      .where('email', email)
      .where('password', md5(password))
      .first();

    if (!data) {
      return response.status(400).json(data);
    }

    return response.json(data);
  },

  async show(request, response) {
    const { id } = request.params

    const data = await connection('users').where('id', id).first();
    
    return response.json(data);
  },

  async create(request, response) {
    let body = request.body;

    body.credit = 0;
    body.access_token = md5(`${body.email}@${body.password}`);

    if (body.password) {
      body.password = md5(body.password);
    }

    if (!body.type) {
      body.type = 3;
    }

    const exist = await connection('users').where('email', body.email).first();

    if (exist) {
      return response.status(409).json({ error: 'E-mail já existente!' })
    }

    const data = await connection('users').insert(body);

    const user = await connection('users').where('id', data[0]).first()

    return response.json(user);
  },

  async update(request, response) {
    const { id } = request.params;
    let body = request.body;

    const exist = await connection('users').where('email', body.email).first();

    if (exist) {
      return response.status(409).json({ error: 'E-mail já existente!' })
    }

    let payload = {
      name: body.name,
      email: body.email,
      cpf: body.cpf,
      phone: body.phone,
      address: body.address,
    };

    if (body.password) {
      payload.password = md5(body.password);
    }

    if (body.facebook) {
      payload.facebook = body.facebook;
    }

    if (body.instagram) {
      payload.instagram = body.instagram;
    }

    await connection('users').where('id', id).update(payload);
    
    const user = await connection('users').where('id', id).first();

    return response.json(user);
  },
  
  async delete(request, response) {
    const { id } = request.params;

    const data = await connection('users').where('id', id).del();
    
    return response.json(data);
  }
}