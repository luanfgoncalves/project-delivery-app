const SalesProductsModel = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('SaleProduct', {
    saleId:{
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    productId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {
      timestamps: false,
      underscored: true,
      tableName: 'sales_products'
  });

  SalesProducts.associate = ({ Sale, Product }) => {
    Sale.belongsToMany(Product, {
      as: 'products',
      through: SalesProducts,
      foreignKey: 'saleId',
      otherKey: 'productId',
    });

    Product.belongsToMany(Sale, {
      as: 'sales',
      through: SalesProducts,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
  };


  return SalesProducts;
};

module.exports = SalesProductsModel;
