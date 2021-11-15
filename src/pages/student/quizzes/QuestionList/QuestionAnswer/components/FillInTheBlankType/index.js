import React, { Fragment } from 'react';
import Card from 'react-bootstrap/Card';
import style from '../../indexQuestion.module.css';
import { PropTypes } from 'prop-types';

const FillInTheBlankType = ({ question }) => {
  return (
    <Fragment>
      <div className={style.question}>
        <p className={style.paragraph}>
          {`${question.id}. ${question.question}`}
        </p>
        <p className={style.paragraph}>Note: Do not use acronyms</p>
        <img
          className={style.sizeOfAvatarInQuestion}
          alt="avatar"
          src="https://freeiconshop.com/wp-content/uploads/edd/image-solid.png"
        />
        <Card className={style.cardbody1}>
          <label>
            <span className={style.spanForAnswer}></span>
          </label>
        </Card>
      </div>
    </Fragment>
  );
};

FillInTheBlankType.propTypes = {

  question: PropTypes.object
};

export default FillInTheBlankType;
