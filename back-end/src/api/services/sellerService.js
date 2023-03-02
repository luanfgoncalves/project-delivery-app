const { User } = require('../../database/models/index');

const getSeller = async () => {
  const sellers = await User.findAll({ where: {role: 'seller' }});
  return sellers;
 };

module.exports = {
  getSeller,
};
