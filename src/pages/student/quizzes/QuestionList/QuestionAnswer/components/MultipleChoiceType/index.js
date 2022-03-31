import React, { Fragment, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import Card from 'react-bootstrap/Card';
import style from '../../indexQuestion.module.scss';

const MultipleChoiceType = ({ question, getAnswer, getPoint }) => {
  const [point, setPoint] = useState(0);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setSelected(null);
  }, [question]);

  useEffect(() => {
    getPoint(point);
  }, [point]);

  return (
    <Fragment>
      <div>
        <div className={style.question}>{question.question}</div>
        {question?.choices.map((choice, idx) => (
          <Card key={idx} className={style.choicesContainer}>
            <div className="d-flex align-items-center">
              <input
                type="radio"
                value={choice.id}
                name="choice"
                onClick={(e) => {
                  setSelected(choice.id);

                  if (choice.is_correct) {
                    setPoint(1);
                  } else {
                    setPoint(0);
                  }

                  getAnswer(e.target.value);
                }}
                checked={selected === choice.id}
              />

              <span className={style.choices}>{choice.choice}</span>
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
  getPoint: PropTypes.any
};

export default MultipleChoiceType;
