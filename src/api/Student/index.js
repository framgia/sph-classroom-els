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
  },

  getDetails: (id) => {
    const options = {
      method: 'GET',
      url: `/students/${id}`,
      headers: {
        'Content-Type': 'image/jpeg, image/png, image/jpg, image/gif, image/svg'
      },
    };

    return API.request(options);
  },

  getRecentActivities: (id) => {
    const options = {
      method: 'GET',
      url: `/studentslog/${id}`
    };

    return API.request(options);
  }
};

export default StudentsApi;
