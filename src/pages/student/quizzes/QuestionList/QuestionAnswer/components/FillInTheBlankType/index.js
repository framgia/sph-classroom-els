import React, { Fragment, useState, useEffect } from 'react';
import style from '../../indexQuestion.module.css';
import { PropTypes } from 'prop-types';

const FillInTheBlankType = ({ question, getAnswer, getPoint }) => {
  const [point, setPoint] = useState(0);

  useEffect(() => {
    getPoint(point);
  }, [point]);

  return (
    <Fragment style={{hieght:'1000px'}}>
      <div className={style.question}>
        <p className={style.paragraph}>{`${question.question}`}</p>
        {/* <p className={style.paragraph}>Note: Do not use acronyms</p> */}
        {/* <img
          className={style.sizeOfAvatarInQuestion}
          alt='avatar'
          src='https://freeiconshop.com/wp-content/uploads/edd/image-solid.png'
        /> */}
        <input
          className={style.cardbody2}
          type='text'
          name='answer'
          placeholder= 'Type your answer here'
          onChange={(e) => {
            if (e.nativeEvent.data != ' ') {
              if (e.target.value === question.text_answer) {
                setPoint(1);
              } else {
                setPoint(0);
              }
            }

            getAnswer(e.target.value);
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
