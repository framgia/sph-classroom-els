import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { Col } from 'react-bootstrap';
import { CgTimer } from 'react-icons/cg';
import { PropTypes } from 'prop-types';

import QuestionApi from '../../../../../../api/Question';

import style from './index.module.css';

const Recent = ({ recentQuizzes, quizzes }) => {
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    QuestionApi.getAll(recentQuizzes.quiz_id).then(({ data }) => {
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
      const highestScore = quizzes.reduce((prev, current) => {
        return prev.score > current.score ? prev : current;
      });

      return highestScore.score;
    }

    return 0;
  };

  return (
    <Col className={style.ConCard}>
      <Card className={style.bg}>
        <Card.Header className={style.forContainerBar}>
          <div className={style.titleText}>{recentQuizzes.title}</div>
          <div className={style.timerIcon} >
            <CgTimer size="15px"/>
            {getTotalTimeLimit()} secs
          </div>
        </Card.Header>
        <Card.Body>
          <div>
            <table style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <td className={style.listTable}>Attempts</td>
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
                    {recentQuizzes.score}/{questions?.length}
                  </td>
                </tr>
                <tr>
                  <td id={style.listTable}></td>
                  <td>
                    <Link
                      to={`/categories/${recentQuizzes.category_id}/quizzes/${recentQuizzes.quiz_id}/questions`}
                    >
                      <p className={style.retake}>Retake Quiz</p>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

Recent.propTypes = {
  recentQuizzes: PropTypes.object,
  quizzes: PropTypes.array,
};

export default Recent;
