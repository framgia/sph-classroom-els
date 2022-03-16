import API from '../Base';

const QuestionApi = {
  getAll: (quizId) => {
    const options = {
      method: 'GET',
      url: `/quizzes/${quizId}/questions`,
    };

    return API.request(options);
  },

  show: ({ id, ...params }) => {
    const options = {
      method: 'GET',
      url: `/categories/${id}`,
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

  editQuestion: (questions, quizId, categoryId) => {
    const options = {
      method: 'POST',
      url: '/admin_edit_question',
      data: {
        questions,
        quizId,
        categoryId
      },
    };

    return API.request(options);
  },
};

export default QuestionApi;
