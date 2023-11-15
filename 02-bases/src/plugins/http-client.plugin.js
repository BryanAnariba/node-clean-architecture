const httpClient = {

  get: async (url) => {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  },
  post: async (url) => {},
  put: async (url) => {},
  delete: async (url) => {},

}

module.exports = {
  httpClient,
}