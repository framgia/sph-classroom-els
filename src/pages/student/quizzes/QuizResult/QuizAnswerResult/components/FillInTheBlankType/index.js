import React, { Fragment } from 'react';
import Card from 'react-bootstrap/Card';
import style from '../../indexAnswer.module.css';
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
            <span className={style.spanForAnswer}>
              {question.answer}
            </span>
            <img
              className={style.sizeOfAvatarInResult}
              alt="avatar"
              src="https://scontent.xx.fbcdn.net/v/t1.15752-9/p206x206/251347130_582599706404834_9085463285954281492_n.png?_nc_cat=105&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeGdEfFbt_a9JU9YlVGy319qPl8e_g7kxlI-Xx7-DuTGUteNnKoktzgpf_FL9lP9ZUi3Ls6_hLGwgD0n2_d-LtP6&_nc_ohc=y6Rd3mokSCcAX8YL7o2&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=332dd5a97e4b210c3d4cb253e189098e&oe=61A4947A"
            />
          </label>
        </Card>
      </div>
    </Fragment>
  );
};

FillInTheBlankType.propTypes={

  question: PropTypes.object
};

export default FillInTheBlankType;
