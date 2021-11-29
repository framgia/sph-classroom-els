import API from '../Base';

const StudentsApi = {
  getAll: ({ ...params }) => {
    const options = {
      method: 'GET',
      url: '/students',
      params: {
        ...params
      }
    };

    return API.request(options);
  },

  follow: (userid) => {
    const options = {
      method: 'POST',
      url: '/follow',
      data: {
        user_id: userid
      }
    };

    return API.request(options);
  },

  unfollow: (userid) => {
    const options = {
      method: 'POST',
      url: '/unfollow',
      data: {
        user_id: userid
      }
    };

    return API.request(options);
  }
};

export default StudentsApi;
