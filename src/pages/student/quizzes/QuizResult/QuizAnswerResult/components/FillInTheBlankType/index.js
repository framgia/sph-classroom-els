import React, { Fragment } from 'react';
import Card from 'react-bootstrap/Card';
import style from '../../indexAnswer.module.css';
import { PropTypes } from 'prop-types';
import { MdCancel } from 'react-icons/md';
import { FcOk } from 'react-icons/fc';

const FillInTheBlankType = ({ question, answer }) => {
  return (
    <Fragment style={{ height: '1000px' }}>
      <div className={style.question1}>
        <p className={style.questionstyleresult}>
          {`${question.id}. ${question.question}`}
        </p>
        {answer.text_answer != question.text_answer ? (
          <div className={style.correctanswermargin}>
            Correct Answer:
            <span> {question.text_answer}</span>
          </div>
        ) : (
          ''
        )}
        <Card className={style.cardbody2}>
          <span className={style.spanAnswer2}>
            {answer.text_answer
              ? answer.text_answer
              : 'You did not provide an answer.'}
            {answer.text_answer === question.text_answer ? (
              <FcOk
                className={style.sizeOfAvatarInResult3}
              />
            ) : (
              <MdCancel
                className={style.sizeOfAvatarInResult3}
                style={{color:'red'}}
              />
            )}
          </span>
        </Card>
      </div>
    </Fragment>
  );
};

FillInTheBlankType.propTypes = {
  question: PropTypes.object,
  answer: PropTypes.object,
};

export default FillInTheBlankType;
