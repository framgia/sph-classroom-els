import React, { Fragment, useState, useEffect } from 'react';
import style from '../../indexQuestion.module.css';
import { PropTypes } from 'prop-types';

const FillInTheBlankType = ({ question, page, getAnswer, getPoint }) => {
  const [point, setPoint] = useState(0);

  useEffect(() => {
    getPoint(point);
  }, [point]);

  return (
    <Fragment>
      <div className={style.question}>
        <p className={style.paragraph}>{`${page}. ${question.question}`}</p>
        <p className={style.paragraph}>Note: Do not use acronyms</p>
        <img
          className={style.sizeOfAvatarInQuestion}
          alt='avatar'
          src='https://freeiconshop.com/wp-content/uploads/edd/image-solid.png'
        />
        <input
          className={style.cardbody1}
          type='text'
          name='answer'
          onChange={(e) => {
            if (e.target.value === question.text_answer) {
              setPoint(1);
            } else {
              setPoint(0);
            }

            getAnswer(e.target.value, point);
          }}
        />
      </div>
    </Fragment>
  );
};

FillInTheBlankType.propTypes = {
  question: PropTypes.object,
  page: PropTypes.number,
  getAnswer: PropTypes.any,
  getPoint: PropTypes.any
};

export default FillInTheBlankType;
