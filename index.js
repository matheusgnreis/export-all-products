const axios = require("axios");

const options = {
  method: 'POST',
  url: 'https://apx-search.e-com.plus/api/v1/items.json',
  headers: {
    'content-type': 'application/json',
    'X-My-ID': 'xxx',
    'X-Access-Token': 'xxx',
    'X-Store-ID': 'xxx'
  },
  data: {
    sort: [{_id: {order: 'desc'}}],
    aggs: {
      'brands.name': {terms: {field: 'brands.name'}},
      'categories.name': {terms: {field: 'categories.name'}},
      status: {terms: {field: 'status'}},
      min_price: {min: {field: 'price'}},
      max_price: {max: {field: 'price'}},
      avg_price: {avg: {field: 'price'}}
    },
    size: 3500,
    from: 0
  }
};

axios.request(options).then(response => {
    const { hits } = response.data.hits
    const allProducts = []
    hits.forEach(hit => {
      if (hit._source) {
          let product = {
              "_id": String(hit._id),
              "sku": String(hit._source.sku),
              "quantity": Number(hit._source.quantity)
              }
              allProducts.push(JSON.stringify(product))
      }
    })
    console.dir(allProducts, { maxArrayLength: null })
}).catch(function (error) {
  console.error(error);
});

