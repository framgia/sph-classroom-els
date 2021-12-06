import React, { Fragment } from 'react';
import Card from 'react-bootstrap/Card';
import style from '../../indexAnswer.module.css';
import { PropTypes } from 'prop-types';
import { FcOk } from 'react-icons/fc';
import { MdCancel } from 'react-icons/md';

const MultipleChoiceType = ({ question, answer }) => {
  const correctAnswerStyling = (choice) => {
    if (choice?.choice === answer?.choice?.choice) {
      if (choice?.is_correct) {
        return `${style.cardbody} ${style.correct}`;
      }

      return `${style.cardbody} ${style.error}`;
    }

    return style.cardbody;
  };
  const correctAnswer = (item) => {
    if (item?.choice === answer?.choice?.choice) {
      if (item?.is_correct) {
        return (
          <FcOk
            className={style.sizeOfAvatarInResult1}
          />
        );
      }

      return (
        <MdCancel
          className={style.sizeOfAvatarInResult3}
          style={{color:'red'}}
        />
      );
    }

    if (item?.is_correct) {
      return (
        <FcOk
          className={style.sizeOfAvatarInResult1}
        />
      );
    }
  };

  return (
    <Fragment>
      <div className={style.question1}>
        <p>
          {question.id}. {question.question}
        </p>
        {question?.choices.map((choice, idx) => (
          <Card key={idx} className={correctAnswerStyling(choice)}>
            <label className={style.inputResult}>
              <div>
                <input
                  type="radio"
                  name="option1"
                  checked={choice?.choice === answer?.choice?.choice}
                  disabled
                />
              </div>
              <div>
                <span className={style.spanAnswer}>{choice?.choice}</span>
              </div>
            </label>
            <div className={style.iconalignmentstyle}>{correctAnswer(choice)}</div>
          </Card>
        ))}
        <br />
        <span className={style.wrongAnswer}>
          {answer?.choice?.choice ? '' : 'You did not choose an answer'}
        </span>
      </div>
    </Fragment>
  );
};

MultipleChoiceType.propTypes = {
  question: PropTypes.object,
  answer: PropTypes.object,
};

export default MultipleChoiceType;
