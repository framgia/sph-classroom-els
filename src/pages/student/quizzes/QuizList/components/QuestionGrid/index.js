import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { BsClockHistory } from 'react-icons/bs';

import style from './index.module.css';
import QuizzesTakenReviewApi from '../../../../../../api/QuizTakenReview';
import QuestionApi from '../../../../../../api/Question';

const QuestionGrid = ({ quiz }) => {
  const [QuizzesRecentReview, setQuizzesRecentReview] = useState(null);
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    QuizzesTakenReviewApi.getAll(quiz.id).then(({ data }) => {
      setQuizzesRecentReview(data.recentQuizzesTaken);
    });

    QuestionApi.getAll(quiz.id).then(({ data }) => {
      setQuestions(data.data);
    });
  }, []);

  const getHighestScore = () => {
    if (QuizzesRecentReview?.length > 0) {
      const highestScore = QuizzesRecentReview.reduce((prev, current) => {
        return prev.score > current.score ? prev : current;
      });

      return highestScore.score;
    }

    return 0;
  };

  const getLatestScore = () => {
    let score = -1;
    if (QuizzesRecentReview?.length > 0) {
      QuizzesRecentReview?.forEach((QuizRecent) => {
        if (quiz.id === QuizRecent.quiz_id && score === -1) {
          score = QuizRecent.score;
        }
      });

      return score;
    }
  };

  const getTotalTimeLimit = () => {
    if (questions != null) {
      let total = 0;

      for (let x = 0; x < questions.length; x++) {
        total += questions[x].time_limit;
      }

      return total;
    }
  };

  return (
    <Card className={style.carddiv}>
      <Card.Header className={style.card} style={{ cursor: 'pointer' }}>
        <div className={style.cardTitle}>
          <span
            style={{ fontWeight: 'bold', fontSize: '18px', color: '#48535B' }}
          >
            {quiz?.title}
          </span>
          <span
            style={{ fontSize: '12px', color: '#48535B', marginTop: '5px' }}
          >
            <BsClockHistory
              size='15px'
              style={{
                marginTop: '0px',
                marginRight: '3px',
                paddingBottom: '3px',
              }}
            />
            {getTotalTimeLimit()} secs
          </span>
        </div>
      </Card.Header>
      <Card.Body className={style.card02} style={{ cursor: 'pointer' }}>
        <div className={style.ResultscoreCardText}>
          <div className={style.ResultScore}>
            <p>Attempts</p>
            <p>{QuizzesRecentReview?.length}</p>
          </div>
          <div className={style.ResultScore}>
            <p>Highest Score</p>
            <p>
              {getHighestScore()}/{questions?.length}
            </p>
          </div>
          <div className={style.ResultScore} style={{ fontWeight: 'bold' }}>
            <p>Latest Score</p>
            <p>
              {getLatestScore() >= 0 ? getLatestScore() : 0}/{questions?.length}
            </p>
          </div>
          {/* {`${quiz.correctAnswers}/${quiz.totalQuestions}`} */}
        </div>
      </Card.Body>
      {quiz.answerCount === 0 || (
        <div className={style.repeatDiv}>Take Quiz</div>
      )}
    </Card>
  );
};

QuestionGrid.propTypes = {
  quiz: PropTypes.object,
};

export default QuestionGrid;
