import API from '../Base';

const QuizzesTakenReviewApi = {
  getAll: (quiz_id) => {
    const options = {
      method: 'GET',
      url: `/quiz_attempts/${quiz_id}`,
    };

    return API.request(options);
  },
};

export default QuizzesTakenReviewApi;
