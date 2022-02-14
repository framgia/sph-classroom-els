import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import Accordion from 'react-bootstrap/Accordion';
import { FcOk } from 'react-icons/fc';

import { BsClockHistory, BsFillCheckCircleFill, BsXCircleFill } from 'react-icons/bs';

import style from '../../components/index.module.scss';

const MultipleChoiceAccordion = ({ questionNumber, question }) => {

  const correctAnswer = (item) => {
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
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <span>
            {questionNumber}. {question.question}
          </span>
          <span className={style.timeLimit}>
            <BsClockHistory /> {question.time_limit} seconds
          </span>
        </Accordion.Header>
        {question.choices.map((choice, idx) => {
          return (
            <Accordion.Body key={idx} className={style.accordionBody}>
              {correctAnswer (choice) ? (
                <BsFillCheckCircleFill className={style.checkMarkIcon} />
              ) : (
                <BsXCircleFill className={style.wrongMarkIcon} />
              )}
              {choice.choice}
            </Accordion.Body>
          );
        })}
      </Accordion.Item>
    </Fragment>
  );
};

MultipleChoiceAccordion.propTypes = {
  question: PropTypes.object,
  questionNumber: PropTypes.number
};

export default MultipleChoiceAccordion;
