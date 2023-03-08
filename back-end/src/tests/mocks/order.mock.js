const postOrder = {
  data: {
    userId: 3,
    sellerId: 2,
    totalPrice: 10.90,
    deliveryAddress: 'Rua dos Bobos',
    deliveryNumber: 0,
    status: 'Pendente'
  },
  sales: [
    {
      id: 1,
      name: 'Skol Lata 250ml',
      quantity: 3,
      subTotal: 6.6000000000000005,
      unitPrice: '2,20'
    }
  ]
};

const newOrder = {
  saleDate: '2023-03-08T02:14:00.680Z',
  id: 1,
  userId: 3,
  sellerId: 2,
  totalPrice: 10.9,
  deliveryAddress: 'Rua dos Bobos',
  deliveryNumber: 0,
  status: 'Pendente'
};

const newSaleProduct = {
  saleId: 3,
  productId: 1,
  quantity: 3
};

module.exports = {
  postOrder,
  newOrder,
  newSaleProduct,
};