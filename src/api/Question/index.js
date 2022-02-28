import API from '../Base';

const QuestionApi = {
  getAll: (quizId) => {
    const options = {
      method: 'GET',
      url: `/quizzes/${quizId}/questions`,
      // params: {
      //   ...params,
      // },
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

  editQuestion: ({ question_id, quiz_id, question_type_id, question, time_limit, text_answer }) => {
    const options = {
      method: 'POST',
      url: '/admin_edit_question',
      data: {
        question_id: question_id,
        quiz_id: quiz_id,
        question_type_id: question_type_id,
        question: question,
        time_limit: time_limit,
        text_answer: text_answer,
      },
    };

    return API.request(options);
  },
};

export default QuestionApi;
