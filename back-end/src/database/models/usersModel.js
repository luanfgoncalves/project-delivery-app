//  Requsito 0

const UsersModel = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name:{
        allowNull: false,
        type: DataTypes.STRING(255)
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(255),
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(255)
      },
      role: {
        allowNull: false,
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
