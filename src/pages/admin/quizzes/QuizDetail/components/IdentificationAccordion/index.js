import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import Accordion from 'react-bootstrap/Accordion';

import { BsClockHistory, BsFillCheckCircleFill } from 'react-icons/bs';

import style from '../../components/index.module.scss';

const IdentificationAccordion = ({ questionNumber, question }) => {
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
        <Accordion.Body className={style.accordionBody}>
          <BsFillCheckCircleFill className={style.checkMarkIcon} />
          {question.text_answer}
        </Accordion.Body>
      </Accordion.Item>
    </Fragment>
  );
};

IdentificationAccordion.propTypes = {
  question: PropTypes.object,
  questionNumber: PropTypes.number
};

export default IdentificationAccordion;
