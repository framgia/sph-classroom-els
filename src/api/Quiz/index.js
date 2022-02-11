import API from '../Base';

const QuizApi = {
  getAll: (id, pageNum) => {
    const options = {
      method: 'GET',
      url: `/categories/${id}/quizzes?page=${pageNum}`,
      //   params: {
      //   ...params,
      // },
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

  getRelatedQuizzes: (categoryId, quizId) => {
    const options = {
      method: 'GET',
      url: `/categories/${categoryId}/relatedQuizzes/${quizId}`,
    };

    return API.request(options);
  },

  adminQuiz: ({ ...params }) => {
    const options = {
      method: 'GET',
      url: '/admin_quizzes',
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
