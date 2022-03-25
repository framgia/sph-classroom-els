import React, { Fragment, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import InputField from '../../../../../../../components/InputField';
import style from '../../indexQuestion.module.scss';

const FillInTheBlankType = ({ question, getAnswer, answer, getPoint }) => {
  const [point, setPoint] = useState(0);

  useEffect(() => {
    getPoint(point);
  }, [point]);

  const getQuestionPoints = (e) => {
    if (e.nativeEvent.data != ' ') {
      if (e.target.value === question.text_answer) {
        setPoint(1);
      } else {
        setPoint(0);
      }
    }

    getAnswer(e.target.value);
  };

  return (
    <Fragment>
      <div className={style.question}>
        <p>{question.question}</p>
        <div className="mt-5" style={{height: '42px'}}>
          <InputField
            inputStyle={style.answerInput}
            type="text"
            value={answer}
            placeholder="Enter your answer here"
            onChange={getQuestionPoints}
          />
        </div>
      </div>
    </Fragment>
  );
};

FillInTheBlankType.propTypes = {
  question: PropTypes.object,
  page: PropTypes.number,
  getAnswer: PropTypes.any,
  answer: PropTypes.string,
  getPoint: PropTypes.any
};

export default FillInTheBlankType;
