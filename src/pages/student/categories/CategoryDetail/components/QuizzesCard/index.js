import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { BsClockHistory } from 'react-icons/bs';
import Col from 'react-bootstrap/Col';

import style from './index.module.scss';
import QuizzesTakenReviewApi from '../../../../../../api/QuizTakenReview';
import QuestionApi from '../../../../../../api/Question';

const QuizzesCard = ({ category_id, quiz }) => {
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
      const totalTimeLimit = questions.reduce((total, questions) => {
        return (total += questions.time_limit);
      }, 0);

      if (totalTimeLimit >= 60) {
        const mins = totalTimeLimit / 60;
        const secs = totalTimeLimit % 60;

        return secs > 0
          ? `${parseInt(mins)} min/s and ${secs} secs`
          : `${parseInt(mins)} min/s`;
      } else {
        return `${totalTimeLimit} secs`;
      }
    }
  };

  return (
    <Col className={style.cardContainer}>
      <Card className={style.card}>
        <Card.Header className={style.cardHeader}>
          <div className={style.cardTitle}>
            <span className={style.titleHeader}>{quiz?.title}</span>
            <span className={style.clockHeader}>
              <BsClockHistory size="15px" className={style.clockIcon} />
              {getTotalTimeLimit()}
            </span>
          </div>
        </Card.Header>
        <Card.Body className={style.cardBody}>
          <div className={style.quizInfo}>
            <div className={style.quizResult}>
              <p className="mb-0">Attempts</p>
              <p>{QuizzesRecentReview?.length}</p>
            </div>
            <div className={style.quizResult}>
              <p className="mb-0">Highest Score</p>
              <p>
                {getHighestScore()}/{questions?.length}
              </p>
            </div>
            <div className={style.quizResult} style={{ fontWeight: 'bold' }}>
              <p className="mb-0">Latest Score</p>
              <p>
                {getLatestScore() >= 0 ? getLatestScore() : 0}/
                {questions?.length}
              </p>
            </div>
          </div>
        </Card.Body>

        <Link
          to={`/categories/${category_id}/quizzes/${quiz.id}/questions`}
          className={style.quizLink}
        >
          Take Quiz
        </Link>
      </Card>
    </Col>
  );
};

QuizzesCard.propTypes = {
  quiz: PropTypes.object,
  category_id: PropTypes.number
};

export default QuizzesCard;
