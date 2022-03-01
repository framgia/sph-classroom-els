import API from '../Base/index';

const AdminApi = {
  createAdmin: ({ name, email }) => {
    const options = {
      method: 'POST',
      url: '/admin/create',
      data: {
        name: name,
        email: email
      }
    };

    return API.request(options);
  }
};

export default AdminApi;
