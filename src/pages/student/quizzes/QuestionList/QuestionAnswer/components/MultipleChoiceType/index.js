import React, { Fragment, useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import style from '../../indexQuestion.module.css';
import { PropTypes } from 'prop-types';

const MultipleChoiceType = ({ question, getAnswer, getPoint }) => {
  const [point, setPoint] = useState(0);
  // const [choice, setChoice] = useState(null);

  useEffect(() => {
    getPoint(point);
  }, [point]);

  return (
    <Fragment>
      <div className={style.question}>
        <div className={style.paragraph}>
          {' '}
          {/* {page}. */}
          {question.question}{' '}
        </div>
        {question?.choices.map((choice, idx) => (
          <Card key={idx} className={style.cardbody1}>
            <div className="d-flex align-items-center">
              <input
                type="radio"
                value={choice.id}
                name="choice"
                onClick={(e) => {
                  if (choice.is_correct) {
                    setPoint(1);
                  } else {
                    setPoint(0);
                  }

                  getAnswer(e.target.value);
                }}
                // checked={choice.is_correct}
              />
              <span className={style.spanForAnswer}>{choice.choice}</span>
            </div>
          </Card>
        ))}
      </div>
    </Fragment>
  );
};

MultipleChoiceType.propTypes = {
  question: PropTypes.object,
  page: PropTypes.number,
  time: PropTypes.number,
  getAnswer: PropTypes.any,
  getPoint: PropTypes.any,
};

export default MultipleChoiceType;
