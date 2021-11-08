import API from '../Base/index';

const AuthApi = {
  getUser: ({ ...params }) => {
    const options = {
      method: 'GET',
      url: '/user',
      params: { ...params },
    };

    return API.request(options);
  },

  register: ({ name, email, password, password_confirmation }) => {
    const options = {
      method: 'POST',
      url: '/registration',
      data: {
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
      },
    };

    return API.request(options);
  },

  login: ({ email, password }) => {
    const options = {
      method: 'POST',
      url: '/login',
      data: {
        email: email,
        password: password,
      },
    };

    return API.request(options);
  },

  logout: () => {
    const options = {
      method: 'POST',
      url: '/logout',
      data: {},
    };

    return API.request(options);
  },

  forgotPassword: (email) => {
    const options = {
      method: 'POST',
      url: '/forgot-password',
      data: {
        email: email,
      },
    };

    return API.request(options);
  },

  resetPassword: ({ email, password, password_confirmation, token }) => {
    const options = {
      method: 'POST',
      url: '/reset-password',
      data: {
        email: email,
        password: password,
        password_confirmation: password_confirmation,
        token: token,
      },
    };

    return API.request(options);
  },
};

export default AuthApi;
