import React, { Fragment } from 'react';
import Card from 'react-bootstrap/Card';
import style from '../../indexQuestion.module.css';
import { PropTypes } from 'prop-types';

const MultipleChoiceType = ({ question }) => {
  return (
    <Fragment>
      <div className={style.question}>
        <p className={style.paragraph}>
          {' '}
          {question.id}. {question.question}{' '}
        </p>
        {question?.choices.map((choice, idx) => (
          <Card key={idx} className={style.cardbody1}>
            <label>
              <input
                type="radio"
                value="option1"
                // checked={choice.description === question.answer}
              />
              <span className={style.spanForAnswer}>{choice.description}</span>
            </label>
          </Card>
        ))}
      </div>
    </Fragment>
  );
};

MultipleChoiceType.propTypes = {

  question: PropTypes.object
};

export default MultipleChoiceType;
