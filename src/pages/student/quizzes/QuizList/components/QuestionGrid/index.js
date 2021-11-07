import React from 'react';
import { Card } from 'react-bootstrap';
import { BsArrowClockwise } from 'react-icons/bs';

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
      className={`${
        style.card
      } ${passOrFailStyle()} d-flex justify-content-center`}
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      <div
        className={`${style.cardTitle} d-flex align-items-center justify-content-center`}
      >
        <div className={style.image}>
          <img
            src="https://www.freeiconspng.com/thumbs/profile-icon-png/account-profile-user-icon--icon-search-engine-10.png"
            className={style.imageSize}
            alt="Quiz Icon"
          />
        </div>
        {quiz?.title}
      </div>
      {quiz.answerCount === 0 ? (
        ''
      ) : (
        <Card.Text
          className={`${style.cardScore} d-flex justify-content-center`}
        >
          {`${quiz.correctAnswers}/${quiz.totalQuestions}`}
        </Card.Text>
      )}

      {quiz.answerCount === 0 || (
        <div className={style.repeatDiv}>
          <BsArrowClockwise className={style.iconClockwise} />
        </div>
      )}
    </Card>
  );
};

export default QuestionGrid;
