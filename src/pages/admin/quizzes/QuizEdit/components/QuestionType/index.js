import React, { useState, Fragment, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { RiArrowDropDownLine } from 'react-icons/ri';
import MultipleChoiceType from '../MultipleChoiceType';
import IdentificationType from '../IdentificationType';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';

import style from '../../index.module.scss';

const QuestionType = ({ question }) => {
  const [questionType, setQuestionType] = useState('multiple_choice');
  const [timeLimit, setTimeLimit] = useState(0);
  // const [selectedQuestionTypeId, setSelectedQuestionTypeId] = useState(null);

  // const onSelectQuestionTypeId = (e) => {
  //   setSelectedQuestionTypeId(question.find(question => question.id === parseInt(e)));
  //   console.log(selectedQuestionTypeId);
  // };

  useEffect(() => {
    if (question) {
      setQuestionType(question?.question_type_id?.toString());
    }
  }, [question]);

  // useEffect(() => {
  //   setQuestionType(question.question);
  //   console.log(questionType);
  // }, [question]);

  const types = [
    {
      name: 'Multiple Choice',
      value: '1',
    },
    {
      name: 'Identification',
      value: '2',
    },
  ];

  // const types = (question) => {
  //   if (question.question_type_id === 1) {
  //     return(
  //       name: 'Multiple Choice',
  //       value: 'multiple_choice',
  //     );
  //   } else {
  //     return(
  //       name: 'Multiple Choice',
  //       value: 'multiple_choice',
  //     );
  //   }
  // }

  const limit = ['5', '10', '20', '30', '60'];

  const onSelectQuestionType = (e) => {
    setQuestionType(e);
  };

  const time = (e) => {
    setTimeLimit(e);
  };

  // const question_type = (choice) => {
  //   switch (choice) {
  //   case 'multiple_choice':
  //     return <MultipleChoiceType questions={question} />;
  //   case 'identification':
  //     return <IdentificationType questions={question} />;
  //   default:
  //     break;
  //   }
  // };

  // const question_type = (questions) => {
  //   if (questions.question_type_id === 1) {
  //     return <MultipleChoiceType questions={question} />;
  //   } else {
  //     return <IdentificationType questions={question} />;
  //   }
  // };

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
      {/* <div>{question_type(questionType)}</div> */}
      {question === null ? (
        <div className={style.loading}>
          <Spinner animation="border" role="status"></Spinner>
          <span className={style.loadingWord}>Loading</span>
        </div>
      ) : (
        <div>
          {question.question_type_id === 1 ? (
            // question_type(questionType,
            <MultipleChoiceType questions={question} />
          ) : (
            // )
            // question_type(questionType,
            <IdentificationType questions={question} />
            // )
          )}
        </div>
      )}
      <div className={style.formGap}>
        <Dropdown onSelect={onSelectQuestionType}>
          <Form>
            <Form.Label className={style.inputTitle}>Question Type</Form.Label>
          </Form>
          {/* {question === null ? (
            <div className={style.loading}>
              <Spinner animation="border" role="status"></Spinner>
              <span className={style.loadingWord}>Loading</span>
            </div>
          ) : ( */}
          <Dropdown.Toggle
            variant="link"
            id="dropdown-basic"
            bsPrefix="none"
            className={style.dropdownStyle}
          >
            {choice(questionType)}
            {/* {question.question_type_id &&
                  types.map((type) => {
                    return (
                      {question.question_type_id === 1 ? (
                        choice(questionType,
                          type='Multiple Choice'
                        )
                      ):(
                        choice(questionType,
                          type='Identification'
                        )
                      )}
                    );
                  })} */}
            <RiArrowDropDownLine className={style.iconSize} />
          </Dropdown.Toggle>
          {/* )} */}
          <Dropdown.Menu className={style.dropdownMenuStyle}>
            {types.map((type, idx) => {
              return (
                <Dropdown.Item key={idx} eventKey={type.value}>
                  {type.name}
                </Dropdown.Item>
              );
            })}
            {/* {question === null ? (
            <div className={style.loading}>
              <Spinner animation="border" role="status"></Spinner>
              <span className={style.loadingWord}>Loading</span>
            </div>
          ) : (
            <Dropdown.Menu className={style.dropdownMenuStyle}>
              {question.question_type_id &&
                types.map((type, idx) => {
                  return (
                    <Dropdown.Item key={idx} eventKey={type.value}>
                      {question.question_type_id === 1 ? (
                        type='Multiple Choice'
                      ):(
                        type='Identification'
                      )}
                    </Dropdown.Item>
                  );
                })}
            </Dropdown.Menu>
          )} */}
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
              {limit.map((time, idx) => {
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
};

export default QuestionType;
