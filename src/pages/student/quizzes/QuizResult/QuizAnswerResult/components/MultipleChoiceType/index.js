import React, { Fragment } from 'react';
import Card from 'react-bootstrap/Card';
import style from '../../indexAnswer.module.css';
import { PropTypes } from 'prop-types';

const MultipleChoiceType = ({ question, answer }) => {
  const correctAnswer = (item) => {
    if (item.choice === answer.choice.choice) {
      if (item.is_correct) {
        return (
          <img
            className={style.sizeOfAvatarInResult}
            alt='avatar'
            src='https://scontent.xx.fbcdn.net/v/t1.15752-9/p206x206/251347130_582599706404834_9085463285954281492_n.png?_nc_cat=105&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeGdEfFbt_a9JU9YlVGy319qPl8e_g7kxlI-Xx7-DuTGUteNnKoktzgpf_FL9lP9ZUi3Ls6_hLGwgD0n2_d-LtP6&_nc_ohc=y6Rd3mokSCcAX8YL7o2&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=332dd5a97e4b210c3d4cb253e189098e&oe=61A4947A'
          />
        );
      }

      return (
        <img
          className={style.sizeOfAvatarInResult}
          alt='avatar'
          src='https://scontent.xx.fbcdn.net/v/t1.15752-9/p206x206/251857791_216016673945638_181170043213305142_n.png?_nc_cat=108&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeFciCgfT14mb7t5NvT-qkvEjgZmtHxtPbWOBma0fG09tYXRIOAM0BKaAow9bdJYBVRzB6bA4K9e5xLYjYBG8seH&_nc_ohc=H9-ZUdfWzt8AX-LOU0a&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=57e1f3e2375cb1e94294a609cd2ef8a7&oe=61A4B040'
        />
      );
    }

    if (item.is_correct) {
      return (
        <img
          className={style.sizeOfAvatarInResult}
          alt='avatar'
          src='https://scontent.xx.fbcdn.net/v/t1.15752-9/p206x206/251347130_582599706404834_9085463285954281492_n.png?_nc_cat=105&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeGdEfFbt_a9JU9YlVGy319qPl8e_g7kxlI-Xx7-DuTGUteNnKoktzgpf_FL9lP9ZUi3Ls6_hLGwgD0n2_d-LtP6&_nc_ohc=y6Rd3mokSCcAX8YL7o2&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=332dd5a97e4b210c3d4cb253e189098e&oe=61A4947A'
        />
      );
    }

    return '';
  };

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
                type='radio'
                name='option1'
                checked={choice.choice === answer.choice.choice}
                disabled
              />
              <span className={style.spanForAnswer}>{choice.choice}</span>
              {correctAnswer(choice)}
            </label>
          </Card>
        ))}
      </div>
    </Fragment>
  );
};

MultipleChoiceType.propTypes = {
  question: PropTypes.object,
  answer: PropTypes.object
};

export default MultipleChoiceType;
