const SalesModel = (sequelize, DataTypes) => {
  const Sales = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId:{
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    sellerId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(9,2)
    },
    deliveryAddress: {
      type: DataTypes.STRING(100)
    }, 
    deliveryNumber: {
      type: DataTypes.STRING(50)
    }, 
    saleDate: {
      type: DataTypes.DATETIME
    }, 
    status: {
      type: DataTypes.STRING(50)
    }, 
  }, {
      timestamps: false,
      underscored: true,
      tableName: 'sales'
  });

  Sales.associate = ({ User }) => {
    Sales.belongsTo(User,
      { foreignKey: 'userId', as: 'user'});
    Sales.belongsTo(User,
      { foreignKey: 'sellerId', as: 'seller'});
  };

  return Sales;
};

module.exports = SalesModel;
