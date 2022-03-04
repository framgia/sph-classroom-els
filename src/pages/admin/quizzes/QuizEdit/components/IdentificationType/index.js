import React, { Fragment, useState } from 'react';
import Form from 'react-bootstrap/Form';
import style from '../../index.module.scss';
import { PropTypes } from 'prop-types';
import { Controller, useForm } from 'react-hook-form';

const IdentificationType = ({ question }) => {
  const { control } = useForm();
  // const [questionEdit, setQuesetionEdit] = useState([]);
  const [questionOnChange, setQuestionOnChange] = useState([]);
  // const [questionItem, setQuestionItem] = useState([]);

  // console.log(questionItem);

  // const onSelectedQuestion = (value) => {
  //   setQuesetionEdit([...questionEdit,{id: question.id, question:value }]);
  // setQuestionOnChange (e) => field.onChange(e.target.value);
  // };
  // console.log(questionOnChange);
  // const onChangequestion = (e) => {
  //   setQuesetionEdit(onChange(e.target.value));
  // };
  // console.log(questionEdit);

  const handleChangeQuestion = (e) => {
    setQuestionOnChange(e.target.value);
    question = {questionOnChange};
  };
  console.log(question);
  return (
    <Fragment>
      <div>
        {/* <Form onSubmit={handleSubmit(onSelectedQuestion)}> */}
        <Form>
          <Form.Label className={style.inputTitle}>Question</Form.Label>
          {question ? (
            <Controller
              data = {question.question}
              control={control}
              name="question"
              defaultValue={question.question}
              render={({ field: { ref } }) => (
                <Form.Control
                  type="text"
                  className={style.inputWidth}
                  // onChange={changeTitle}
                  onChange ={handleChangeQuestion}
                  value={questionOnChange}
                  // value= {value}
                  ref={ref}
                />
              )}
            />
          ) : (
            ''
          )}
        </Form>
      </div>
      <div className={style.formSpacing}>
        <Form.Label className={style.inputTitle}>Answer</Form.Label>
        <Controller
          control={control}
          name="text_answer"
          defaultValue={question.text_answer}
          render={({ field: { onChange, value, ref } }) => (
            <Form.Control 
              as="textarea" 
              className={style.inputHeight} 
              onChange={onChange}
              value={value}
              ref={ref}
            />
          )}
        />
      </div>
    </Fragment>
  );
};

IdentificationType.propTypes = {
  question: PropTypes.object,
};

export default IdentificationType;
