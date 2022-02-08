import API from '../Base';

const LearningApi = {
  getAll: () => {
    const options = {
      method: 'GET',
      url: '/learnings',
    };

    return API.request(options);
  }
};

export default LearningApi;