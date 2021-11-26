import React from 'react';
import { Card } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { BsClockHistory } from 'react-icons/bs';

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
    <Card className={style.carddiv}>
      <Card.Header
        className={`${style.card} ${passOrFailStyle()}`}
        onClick={handleCardClick}
        style={{ cursor: 'pointer' }}
      >
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
            5 mins
          </span>
        </div>
      </Card.Header>
      <Card.Body
        className={`${
          style.card02
        } ${passOrFailStyle()} d-flex justify-content-center`}
        onClick={handleCardClick}
        style={{ cursor: 'pointer' }}
      >
        {quiz.answerCount === 0 ? (
          ''
        ) : (
          <div className={style.ResultscoreCardText}>
            <div className={style.ResultScore}>
              <p>Attempts</p>
              <p>N/A</p>
            </div>
            <div className={style.ResultScore}>
              <p>Highest Score</p>
              <p>N/A</p>
            </div>
            <div className={style.ResultScore} style={{ fontWeight: 'bold' }}>
              <p>Latest Score</p>
              <p>N/A</p>
            </div>
            {/* {`${quiz.correctAnswers}/${quiz.totalQuestions}`} */}
          </div>
        )}
      </Card.Body>
      {quiz.answerCount === 0 || (
        <div className={style.repeatDiv}>
          Take Quiz
        </div>
      )}
    </Card>
  );
};

QuestionGrid.propTypes = {
  quiz: PropTypes.object,
};

export default QuestionGrid;
