//  Requsito 0

const UsersModel = (sequelize, DataTypes) => {
    const user = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name:{
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      role: {
        type: DataTypes.STRING
      }, 
    }, {
        timestamps:false,
        underscored:true,
    });

    // user.associate = (models) => {
    //   user.hasMany(models.BlogPost, {
    //     foreignKey: 'userId', as: 'blogPosts'
    //   })
    // }

    return user;
  };
  
  module.exports = UsersModel;
