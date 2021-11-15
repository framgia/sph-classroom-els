import React from 'react';
import { Card } from 'react-bootstrap';
import { PropTypes } from 'prop-types';


import style from './index.module.css';

const QuestionGrid = ({ quiz }) => {
  const handleCardClick = () => {
    console.log(`${quiz?.title} is clicked`);
  };

  const passOrFailStyle = () => {
    if (quiz.answerCount > 0 && quiz.correctAnswers > 7) {
      return style.pass;
    }

    if (quiz.answerCount > 0 && quiz.correctAnswers <= 7) {
      return style.fail;
    }

    return;
  };

  return (
    <Card
      className={`${style.card
      } ${passOrFailStyle()} d-flex justify-content-center`}
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      <div
        className={`${style.cardTitle} d-flex align-items-center justify-content-center`}
      >
        {quiz?.title}
      </div>
      {/* {quiz.answerCount === 0 ? (
        ''
      ) : (
        <Card.Text
          className={`${style.cardScore} d-flex justify-content-center`}
        >
          {`${quiz.correctAnswers}/${quiz.totalQuestions}`}
        </Card.Text>
      )} */}

      {/* {quiz.answerCount === 0 || (
        <div className={style.repeatDiv}>
          <BsArrowClockwise className={style.iconClockwise} />
        </div>
      )} */}
    </Card>
  );
};

QuestionGrid.propTypes = {

  quiz: PropTypes.object
};

export default QuestionGrid;
