import API from '../Base/index';

const AnswerApi = {
  getAll: ({ ...params }) => {
    const options = {
      method: 'GET',
      url: '/user',
      params: { ...params }
    };

    return API.request(options);
  },

  show: () => {},

  store: ({
    quizTakenId,
    choiceId,
    question_id,
    text_answer,
    text_correct,
    time_left
  }) => {
    const options = {
      method: 'POST',
      url: `/quizzes-taken/${quizTakenId}/answers`,
      data: {
        quizzes_taken_id: quizTakenId,
        choice_id: choiceId,
        question_id: question_id,
        text_answer: text_answer,
        text_correct: text_correct,
        time_left: time_left
      }
    };

    return API.request(options);
  },

  update: () => {},

  delete: () => {},

  restore: () => {}
};

export default AnswerApi;
