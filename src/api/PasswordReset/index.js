import API from '../Base';

const PasswordResetApi = {
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

export default PasswordResetApi;
