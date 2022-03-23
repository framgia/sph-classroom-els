import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import Card from 'react-bootstrap/Card';
import QuestionAnswer from './QuestionAnswer';
import Button from '../../../../components/Button';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';
import QuizApi from '../../../../api/Quiz';
import QuestionApi from '../../../../api/Question';
import QuizTaken from '../../../../api/QuizTaken';
import style from './index.module.scss';

export const QuestionsContext = React.createContext();

const QuestionList = () => {
  const userId = Cookies.get('user_id');
  const { categoryId, quizId } = useParams();

  const [quizInfo, setQuizInfo] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [quizTakenId, setQuizTakenId] = useState(null);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  useEffect(() => {
    QuizApi.show({ categoryId, quizId }).then(({ data }) => {
      setQuizInfo(data.data);
    });

    QuestionApi.getAll(quizId).then(({ data }) => {
      setQuestions(data.data);
    });
  }, []);

  const getTotalTimeLimit = () => {
    if (questions != null) {
      let total = 0;

      for (let x = 0; x < questions.length; x++) {
        total += questions[x].time_limit;
      }

      return total;
    }
  };

  const startQuiz = () => {
    setShowQuestionnaire(!showQuestionnaire);

    QuizTaken.store({ quizId, userId }).then(({ data }) => {
      setQuizTakenId(data.quizzes_taken_id);
    });
  };

  return (
    <div className="container">
      <QuestionsContext.Provider
        value={{ questions, title: quizInfo?.title, quizTakenId }}
      >
        {showQuestionnaire ? (
          ''
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <Card className={style.card}>
              <Card.Header id={style.cardHeader}>
                <a href={`/categories/${categoryId}/quizzes`}>
                  <BsFillArrowLeftSquareFill className={style.backButton} />
                </a>
                <div className={style.topic}>
                  <center>{quizInfo?.title}</center>
                </div>
              </Card.Header>
              <Card.Body className={style.cardBody}>
                <div align="center" id={style.overview}>
                  <p>This quiz consist of {questions?.length} items</p>
                  <hr />
                  <p> Overall Time: {getTotalTimeLimit()} seconds </p>
                </div>
                <div className={style.startButton}>
                  <Button
                    buttonLabel="Start Quiz"
                    buttonSize="sm"
                    onClick={startQuiz}
                  />
                </div>
              </Card.Body>
            </Card>
          </div>
        )}
        {quizTakenId && questions && showQuestionnaire ? (
          <QuestionAnswer />
        ) : (
          ''
        )}
      </QuestionsContext.Provider>
    </div>
  );
};

export default QuestionList;
