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

// or another way inside admin
const body = {
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
window.callSearchApi('items.json', 'POST', (err, json) => {
  if (!err) {
    const { hits } = json.hits
    const allProducts = []
    let item
    hits.forEach((hit, index) => {
      item = hit._source
      if (item) {
        const categories = (item) => {
          let result = ''
          let categories = item.categories
          if (Array.isArray(categories) && (categories.length > 0)) {
            categories.forEach(cat => {
              return result += `,${cat.slug}`
            })
          } 
          return result
        }
          let product = {
              "_id": String(hit._id),
              "sku": String(item.sku),
              "name": String(item.name),
              "brands": item.brands && item.brands[0] && item.brands[0].name ? String(item.brands[0].name) : undefined,
              "slug": String(item.slug),
              "slug_categories": categories(item),
              "price": Number(item.price),
              "ad_relevance": Number(item.ad_relevance)
              //"quantity": Number(item.quantity)
              }
              allProducts.push(JSON.stringify(product))
      }
    })
    console.dir(allProducts, { maxArrayLength: null }) 
  }
}, body)

