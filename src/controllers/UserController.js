const connection = require('../database');
const md5 = require('md5');

module.exports = { 
  async index(request, response) {
    const data = await connection('users');
    
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

    const exist = await connection('users').where('username', body.username).orWhere('email', body.email).first();

    if (exist) {
      return response.status(409).json({ error: 'Usuário ou E-mail já existente!' })
    }

    const data = await connection('users').insert(body);

    const user = await connection('users').where('id', data[0]).first()

    return response.json(user);
  },

  async update(request, response) {
    const { id } = request.params;
    let body = request.body;

    if (body.password) {
      body.password = md5(body.password);
    }

    const data = await connection('users').where('id', id).update(body);

    return response.json(data);
  },
  
  async delete(request, response) {
    const { id } = request.params;

    const data = await connection('users').where('id', id).del();
    
    return response.json(data);
  }
}