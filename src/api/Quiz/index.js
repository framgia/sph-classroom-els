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

  adminAdd: (name, instruction) => {
    const options = {
      method: 'POST',

      url: '/admin_add',

      data: {
        title: name,
        instruction: instruction,
        category_id: '1'
      }

    };

    return API.request(options);
  },

  store: () => {},

  update: () => {},

  delete: () => {},

  restore: () => {},
};

export default QuizApi;
