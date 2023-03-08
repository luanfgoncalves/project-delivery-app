const allProducts = [
  {
    id: 1,
    name: 'Skol Lata 250ml',
    price: '2.20',
    urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
  },
  {
    id: 2,
    name: 'Heineken 600ml',
    price: '7.50',
    urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
  },
];

const orderWithProducts = {
  id: 1,
  userId: 3,
  sellerId: 2,
  totalPrice: '10.90',
  deliveryAddress: 'Rua dos Bobos',
  deliveryNumber: '0',
  saleDate: '2023-03-08T02:14:01.000Z',
  status: 'Pendente',
  products: [
    {
      id: 1,
      name: 'Skol Lata 250ml',
      price: '2.20',
      urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
      SaleProduct: {
        quantity: 3
      }
    }
  ]
};

module.exports = {
  allProducts,
  orderWithProducts,
};