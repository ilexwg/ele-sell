const ELE_API = {
  // 获取商家数据
  getSeller: {
    method: 'get',
    url: '/seller'
  },
  // 获取商品数据
  getGoods: {
    method: 'get',
    url: '/goods'
  },
  // 获取评价数据
  getRatings: {
    method: 'get',
    url: '/ratings'
  }
};

export default ELE_API;
