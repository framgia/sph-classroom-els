import API from '../Base/index';

const QuizTaken = {
  getAll: ({ ...params }) => {
    const options = {
      method: 'GET',
      url: '/user',
      params: { ...params }
    };

    return API.request(options);
  },

  show: () => {},

  store: ({ quizId, userId, score }) => {
    const options = {
      method: 'POST',
      url: '/quizzes-taken',
      data: {
        quiz_id: quizId,
        user_id: userId,
        score: score
      }
    };

    return API.request(options);
  },

  update: (quizTakenId, score) => {
    const options = {
      method: 'PATCH',
      url: `/quizzes-taken/${quizTakenId}`,
      data: {
        score: score
      }
    };

    return API.request(options);
  },

  getRecent: (id) => {
    const options = {
      method: 'GET',
      url: `/recent-quizzes/${id}`
    };

    return API.request(options);
  },

  getRecentQuizzes: () => {
    const options = {
      method: 'GET',
      url: '/recentQuizzes'
    };

    return API.request(options);
  },

  getScore: (quizTakenID) => {
    const options = {
      method: 'GET',
      url: `/quizzes-taken/${quizTakenID}/score`
    };

    return API.request(options);
  }
};

export default QuizTaken;
