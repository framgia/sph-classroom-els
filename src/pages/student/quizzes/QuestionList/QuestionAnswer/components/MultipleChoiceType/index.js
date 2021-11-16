import React, { Fragment } from 'react';
import Card from 'react-bootstrap/Card';
import style from '../../indexQuestion.module.css';
import { PropTypes } from 'prop-types';

const MultipleChoiceType = ({ question, page }) => {
  return (
    <Fragment>
      <div className={style.question}>
        <p className={style.paragraph}>
          {' '}
          {page}. {question.question}{' '}
        </p>
        {question?.choices.map((choice, idx) => (
          <Card key={idx} className={style.cardbody1}>
            <label>
              <input
                type="radio"
                value="option1"
              // checked={choice.is_correct}
              />
              <span className={style.spanForAnswer}>{choice.choice}</span>
            </label>
          </Card>
        ))}
      </div>
    </Fragment>
  );
};

MultipleChoiceType.propTypes = {

  question: PropTypes.object,
  page: PropTypes.number
};

export default MultipleChoiceType;
