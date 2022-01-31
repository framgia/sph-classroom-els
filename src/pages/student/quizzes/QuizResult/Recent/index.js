import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { CgTimer } from 'react-icons/cg';
import { PropTypes } from 'prop-types';

import QuestionApi from '../../../../../api/Question';

import style from './index.module.css';

const Recent = ({ relatedQuiz, quizzes }) => {
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    QuestionApi.getAll(relatedQuiz.id).then(({ data }) => {
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

  const getHighestScore = () => {
    if (quizzes?.length > 0) {
      const highestScore = quizzes?.reduce((prev, current) => {
        return prev.score > current.score ? prev : current;
      });

      return highestScore.score;
    }

    return 0;
  };

  const getLatestScore = (quizId) => {
    if (quizzes?.length > 0) {
      let score = 0;

      quizzes.forEach((quiz) => {
        if (quiz.id === quizId) {
          score = quiz.score;
        }
      });
      return score;
    }

    return 0;
  };

  return (
    <Card className={style.bg}>
      <Card.Header className={style.forContainerBar}>
        <table style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td className={style.titleText}>{relatedQuiz.title}</td>
              <td style={{ textAlign: 'right' }}>
                <CgTimer size="15px" />
                {getTotalTimeLimit()} secs
              </td>
            </tr>
          </tbody>
        </table>
      </Card.Header>
      <Card.Body>
        <div>
          <table style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td className={style.listTable}>Attempt</td>
                <td className={style.forSeccolum}>{quizzes?.length}</td>
              </tr>
              <tr>
                <td className={style.listTable}>Highest Score</td>
                <td className={style.forSeccolum}>
                  {getHighestScore()}/{questions?.length}
                </td>
              </tr>
              <tr>
                <td id={style.listTable}>Latest Score</td>
                <td className={style.forSeccolum2}>
                  {' '}
                  {getLatestScore(relatedQuiz.id)}/{questions?.length}
                </td>
              </tr>
            </tbody>
          </table>
          <Link
            to={`/categories/${relatedQuiz.category_id}/quizzes/${relatedQuiz.id}/questions`}
          >
            <p className={style.retake}>Take Quiz</p>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

Recent.propTypes = {
  relatedQuiz: PropTypes.object,
  quizzes: PropTypes.array,
};

export default Recent;
