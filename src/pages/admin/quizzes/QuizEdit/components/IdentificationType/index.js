import React, { Fragment, useState } from 'react';
import Form from 'react-bootstrap/Form';
import style from '../../index.module.scss';
import { PropTypes } from 'prop-types';
import { Controller, useForm } from 'react-hook-form';

const IdentificationType = ({ question }) => {
  const { control, handleSubmit } = useForm();
  const [questionEdit, setQuesetionEdit] = useState([]);

  const onSelectedQuestion = (value) => {
    setQuesetionEdit([...questionEdit,{id: question.id, question:value }]);
  };
  console.log(questionEdit);
  return (
    <Fragment>
      <div>
        <Form onSubmit={handleSubmit(onSelectedQuestion)}>
          <Form.Label className={style.inputTitle}>Question</Form.Label>
          <Controller
            control={control}
            name="question"
            defaultValue={question.question}
            render={({ field: { onChange, value, ref } }) => (
              <Form.Control
                type="title"
                className={style.inputWidth}
                onChange={onChange}
                value={value}
                ref={ref}
              />
            )}
          />
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
