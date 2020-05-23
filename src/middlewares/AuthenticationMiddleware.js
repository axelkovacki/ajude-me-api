const connection = require('../database');

module.exports = async (request, response, next) => {
  if (!request.headers.authorization || !request.headers.authorization.length) {
    return response.status(400).json({ error: 'User not Unauthorized!'});
  }

  const user = await connection('users').where('access_token', request.headers.authorization).first();

  if (!user) {
    return response.status(400).json({ error: 'User not Unauthorized!'});
  }

  request.contents = {
    user
  };

  next();
}