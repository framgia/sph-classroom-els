import API from '../Base';

const CategoryApi = {
  getAll: ({ ...params }) => {
    const options = {
      method: 'GET',
      url: '/categories',
      params: {
        ...params
      }
    };

    return API.request(options);
  },

  show: ({ categoryId, ...params }) => {
    const options = {
      method: 'GET',
      url: `/categories/${categoryId}`,
      params: {
        ...params
      }
    };

    return API.request(options);
  },

  store: (name, description) => {
    const options = {
      method: 'POST',
      
      url: '/admin/add-category',

      data: {
        name: name,
        description: description
      }
      
    };

    return API.request(options);
  },

  update: (name, description, category_id) => {
    const options = {
      method: 'PATCH',
      
      url: `/categories/${category_id}`,

      data: {
        name: name,
        description: description,

      }
      
    };

    return API.request(options);
  },

  delete: () => {},

  restore: () => {}
};

export default CategoryApi;
