//  Requsito 0

const UsersModel = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name:{
        type: DataTypes.STRING(255)
      },
      email: {
        type: DataTypes.STRING(255)
      },
      password: {
        type: DataTypes.STRING(255)
      },
      role: {
        type: DataTypes.STRING(255)
      }, 
    }, {
        timestamps: false,
        underscored: true,
        tableName: 'users'
    });

  User.associate = ({ Sale }) => {
    User.hasMany(Sale,
      { foreignKey: 'userId', as: 'user' });
    User.hasMany(Sale,
      { foreignKey: 'sellerId', as: 'seller' });
  }   

    return User;
  };
  
  module.exports = UsersModel;
