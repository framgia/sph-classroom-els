import API from '../Base/index';

const ProfileEditApi = {
  profileEdit: ({ name, email, password }) => {
    const options = {
      method: 'POST',
      url: '/profileEdit',
      data: {
        name: name,
        email: email,
        password: password,
      },
    };

    return API.request(options);
  }
};

export default ProfileEditApi;
