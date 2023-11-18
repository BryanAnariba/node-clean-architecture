const axios = require('axios');
const httpClient = {
  get: async (url) => {
    const {data} = await axios.get(url);
    return data;
  },
  post: async (url) => {},
  put: async (url) => {},
  delete: async (url) => {},
}

module.exports = {
  httpClient,
}