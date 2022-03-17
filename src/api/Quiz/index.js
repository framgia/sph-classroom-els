import API from '../Base';

const QuizApi = {
  getAll: (id, pageNum) => {
    const options = {
      method: 'GET',
      url: `/categories/${id}/quizzes?page=${pageNum}`
    };

    return API.request(options);
  },

  show: ({ categoryId, quizId, ...params }) => {
    const options = {
      method: 'GET',
      url: `/categories/${categoryId}/quizzes/${quizId}`,
      params: {
        ...params
      }
    };

    return API.request(options);
  },

  getRelatedQuizzes: (categoryId, quizId) => {
    const options = {
      method: 'GET',
      url: `/categories/${categoryId}/relatedQuizzes/${quizId}`
    };

    return API.request(options);
  },

  adminQuiz: ({ ...params }) => {
    const options = {
      method: 'GET',
      url: '/admin_quizzes',
      params: {
        ...params
      }
    };

    return API.request(options);
  },

  addQuiz: (name, instruction, location) => {
    const options = {
      method: 'POST',
      url: '/admin/add-quiz',
      data: {
        title: name,
        instruction: instruction,
        category_id: location.id
      }
    };

    return API.request(options);
  },

  deleteQuiz: (quiz_id) => {
    const options = {
      method: 'DELETE',
      url: `/admin/delete-quiz/${quiz_id}`
    };

    return API.request(options);
  }
};

export default QuizApi;
