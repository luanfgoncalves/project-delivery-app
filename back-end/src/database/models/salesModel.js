const SalesModel = (sequelize, DataTypes) => {
  const Sales = sequelize.define('Sale', {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId:{
      allowNull: false,
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    sellerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    totalPrice: {
      allowNull: false,
      type: DataTypes.DECIMAL(9,2)
    },
    deliveryAddress: {
      allowNull: false,
      type: DataTypes.STRING(100)
    }, 
    deliveryNumber: {
      allowNull: false,
      type: DataTypes.STRING(50)
    }, 
    saleDate: {
      allowNull: false,
      type: DataTypes.NOW,
      defaultValue: DataTypes.NOW,
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
