import React, { useState, Fragment, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { RiArrowDropDownLine } from 'react-icons/ri';
import MultipleChoiceType from '../MultipleChoiceType';
import IdentificationType from '../IdentificationType';
import PropTypes from 'prop-types';

import style from '../../index.module.scss';
import FilterDropdown from '../../../../../../components/FilterDropdown';

const QuestionType = ({ question, onGetData, onChangeTimeLimit, onChangeQuestionType, onChangeChoices }) => {
  const [questionType, setQuestionType] = useState('multiple_choice');
  const [timeLimit, setTimeLimit] = useState(0);
  const timeOptions = [5, 10, 20, 30, 60];
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

  useEffect(() => {
    if (question) {
      setQuestionType(question?.question_type_id?.toString());
      setTimeLimit(question?.time_limit);
    }
  }, [question]);

  // Watches changes in the timeLimit variable
  // If timeLimit is changed, call function and pass new timeLimit value and question id
  useEffect(() => {
    if (question) {
      onChangeTimeLimit(timeLimit, question.id);
    }
  }, [timeLimit]);

  // Watches changes in the questionType variable
  // If questionType is changed, call function and pass new questionType value and question id
  useEffect(() => {
    if (question){
      onChangeQuestionType(questionType, question.id);
    }
  }, [questionType]);

  const handleChangeQuestionType = (value) => {
    onGetData(value);
  };

  const onSelectQuestionType = (e) => {
    setQuestionType(e);
  };

  const time = (e) => {
    setTimeLimit(e);
  };

  const updateChoices = (choices, questionId) => {
    console.log(choice(), questionId);
    onChangeChoices(choices, questionId);
  };

  const question_type = (choice) => {
    switch (choice) {
    case '1':
      return <MultipleChoiceType question={question} getData={handleChangeQuestionType} onUpdateChoices={updateChoices}/>;
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
        <Form>
          <Form.Label className={style.inputTitle}>Question Type</Form.Label>
          <FilterDropdown
            onSelect={onSelectQuestionType}
            dropdownLabel={choice(questionType)}
            dropdownItems={question_type_id}
            eventKey={question_type_id.value}
            filter={questionType}
            setFilter={setQuestionType}
          />
        </Form>
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
          {/* <Form>
            <Form.Label className={style.inputTitle}>Time Limit</Form.Label>
            <FilterDropdown
              onSelect={time}
              dropdownLabel={timeLimit}
              dropdownItems={timeOptions}
              eventKey={time}
              filter={timeLimit}
              setFilter={setTimeLimit}
            />
          </Form> */}
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
              {timeOptions.map((time, idx) => {
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
  onChangeTimeLimit: PropTypes.func,
  onChangeQuestionType: PropTypes.func,
  onChangeChoices: PropTypes.func
};

export default QuestionType;
