import API from '../Base/index';

const ProfileEditApi = {
  profileEdit: ({name, email, password}) => {
    const options = {
      method: 'POST',
      url: '/profileEdit',
      data: {
        name: name,
        email: email,
        password: password
      },
    };

    return API.request(options);
  },

  uploadImage: ( image ) => {
    const options = {
      method: 'POST',
      url: '/profileEdituploadImage',
      data: image,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    };

    return API.request(options);
  },

  restore: ({name, email, password}) => {
    const options = {
      method: 'POST',
      url: '/admin/profile-edit',
      data: {
        name: name,
        email: email,
        password: password
      },
    };

    return API.request(options);
  },
};

export default ProfileEditApi;
