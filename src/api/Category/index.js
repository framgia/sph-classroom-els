import API from '../Base';

const CategoryApi = {
  getAll: ({ ...params } = {}) => {
    const options = {
      method: 'GET',
      url: '/categories',
      params: {
        ...params,
      },
    };

    return API.request(options);
  },

  show: ({ categoryId, ...params }) => {
    const options = {
      method: 'GET',
      url: `/categories/${categoryId}`,
      params: {
        ...params,
      },
    };

    return API.request(options);
  },

  store: () => {},

  update: () => {},

  delete: () => {},

  restore: () => {},
};

export default CategoryApi;
