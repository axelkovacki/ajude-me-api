const connection = require('../database'); 

module.exports = { 
  async create(request, response) {
    const { id } = request.params;
    const { user } = request.contents;
    const { body } = request;

    if (user.type !== 2 || user.id === body.receiving) {
      return response.status(400).json({ error: 'User not Unauthorized to Transfer!' });
    }

    const reward = await connection('rewards').where('id', id).where('user_id', user.id).first();

    if (!reward) {
      return response.status(404).json({ error: 'Reward not found!' });
    }

    const userReceiving = await connection('users').where('id', body.receiving).first();

    if (!userReceiving) {
      return response.status(404).json({ error: 'User to receive not found!' });
    }
    
    const rewardCredits = await connection('reward_credits').insert({
      user_depositor_id: user.id,
      user_receiving_id: user.id,
      reward_id: reward.id
    });

    const data = await connection('users').where('id', userReceiving.id).update({
      credit: userReceiving.credit - reward.credit
    });

    return response.json(data);
  }
}