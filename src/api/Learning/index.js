import API from '../Base';

const LearningApi = {
  getAll: ({ ...params }) => {
    const options = {
      method: 'GET',
      url: '/learnings',
      params: {
        ...params
      }
    };

    return API.request(options);
  }
};

export default LearningApi;