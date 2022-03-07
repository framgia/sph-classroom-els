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

  store: (name, description, parentCategoryID) => {
    const options = {
      method: 'POST',
      url: '/admin/add-category',
      data: {
        name: name,
        description: description,
        category_id: parentCategoryID
      }
    };

    return API.request(options);
  },

  getCategories: ({ ...params }) => {
    const options = {
      method: 'GET',
      url: '/admin/categories',
      params: {
        ...params
      }
    };

    return API.request(options);
  },

  update: (name, description, parentCategoryID, category_id) => {
    const options = {
      method: 'PATCH',
      url: `/categories/${category_id}`,
      data: {
        name: name,
        description: description,
        category_id: parentCategoryID
      }
    };

    return API.request(options);
  },

  getParentCategories: (subcategoryID) => {
    const options = {
      method: 'GET',
      url: `/admin/nested-categories/${subcategoryID}`
    };

    return API.request(options);
  },

  listOfCategories: ({ ...params }) => {
    const options = {
      method: 'GET',
      url: '/admin/categories-data',
      params: {
        ...params
      }
    };

    return API.request(options);
  },

  delete: () => {},

  restore: () => {}
};

export default CategoryApi;
