import React, { useState, Fragment, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { RiArrowDropDownLine } from 'react-icons/ri';
import MultipleChoiceType from '../MultipleChoiceType';
import IdentificationType from '../IdentificationType';
import PropTypes from 'prop-types';

import style from '../../index.module.scss';

const QuestionType = ({ question, onGetData }) => {
  const [questionType, setQuestionType] = useState('multiple_choice');
  const [timeLimit, setTimeLimit] = useState(0);

  useEffect(() => {
    if (question) {
      setQuestionType(question?.question_type_id?.toString());
      setTimeLimit(question?.time_limit);
    }
  }, [question]);

  const handleChangeQuestionType = (value) => {
    onGetData(value);
  };

  const question_type_id = [
    {
      name: 'Multiple Choice',
      value: '1',
    },
    {
      name: 'Identification',
      value: '2',
    },
  ];

  const time_limit = ['5', '10', '20', '30', '60'];

  const onSelectQuestionType = (e) => {
    setQuestionType(e);
  };

  const time = (e) => {
    setTimeLimit(e);
  };

  const question_type = (choice) => {
    switch (choice) {
    case '1':
      return <MultipleChoiceType question={question} getData = {handleChangeQuestionType} />;
    case '2':
      return <IdentificationType question={question} getData = {handleChangeQuestionType} />;
    default:
      break;
    }
  };

  const choice = (option) => {
    switch (option) {
    case '1':
      return 'Multiple Choice';
    case '2':
      return 'Identification';
    default:
      break;
    }
  };

  return (
    <Fragment>
      <div  className={style.questionTypestyle}>{question_type(questionType)}</div>
      <div className={style.formGap}>
        <Dropdown onSelect={onSelectQuestionType}>
          <Form>
            <Form.Label className={style.inputTitle}>Question Type</Form.Label>
          </Form>
          <Dropdown.Toggle
            variant="link"
            id="dropdown-basic"
            bsPrefix="none"
            className={style.dropdownStyle}
          >
            {choice(questionType)}
            <RiArrowDropDownLine className={style.iconSize} />
          </Dropdown.Toggle>
          <Dropdown.Menu className={style.dropdownMenuStyle}>
            {question_type_id.map((type, idx) => {
              return (
                <Dropdown.Item key={idx} eventKey={type.value}>
                  {type.name}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
        <div className={style.formSpacing}>
          <Dropdown onSelect={time}>
            <Form>
              <Form.Label className={style.inputTitle}>Time Limit</Form.Label>
            </Form>
            <Dropdown.Toggle
              variant="link"
              id="dropdown-basic"
              bsPrefix="none"
              className={style.dropdownStyle}
            >
              {timeLimit} seconds
              <RiArrowDropDownLine className={style.iconSize} />
            </Dropdown.Toggle>
            <Dropdown.Menu className={style.dropdownMenuStyle}>
              {time_limit.map((time, idx) => {
                return (
                  <Dropdown.Item key={idx} eventKey={time}>
                    {time} seconds
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </Fragment>
  );
};

QuestionType.propTypes = {
  question: PropTypes.object,
  onGetData: PropTypes.func,
};

export default QuestionType;
