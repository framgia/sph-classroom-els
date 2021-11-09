import API from '../Base';

const QuizApi = {
  getAll: ({ id, ...params }) => {
    const options = {
      method: 'GET',
      url: `/categories/${id}/quizzes`,
      params: {
        ...params,
      },
    };

    return API.request(options);
  },

  show: ({ categoryId, quizId, ...params }) => {
    const options = {
      method: 'GET',
      url: `/categories/${categoryId}/quizzes/${quizId}`,
      params: {
        ...params,
      },
    };

    return API.request(options);
  },

  store: () => {},

  update: () => {},

  delete: () => {},

  restore: () => {},
};

export default QuizApi;
