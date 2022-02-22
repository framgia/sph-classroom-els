import React, { Fragment } from 'react';
import Form from 'react-bootstrap/Form';
import style from '../../index.module.scss';
import { PropTypes } from 'prop-types';
import { Controller, useForm } from 'react-hook-form';

const IdentificationType = ({ questions }) => {
  console.log(questions);
  const { control } = useForm();
  return (
    <Fragment>
      <div>
        <Form>
          <Form.Label className={style.inputTitle}>Question</Form.Label>
          <Controller
            control={control}
            name="question"
            // defaultValue={questions.question}
            render={({ field: { onChange, ref } }) => (
              <Form.Control
                type="title"
                className={style.inputWidth}
                value={questions.question}
                onChange={onChange}
                // value={value}
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
          // defaultValue={questions.text_answer}
          render={({ field: { onChange, ref } }) => (
            <Form.Control 
              as="textarea" 
              className={style.inputHeight} 
              onChange={onChange}
              value={questions.text_answer}
              // value={value}
              ref={ref}
            />
          )}
        />
      </div>
    </Fragment>
  );
};

IdentificationType.propTypes = {
  questions: PropTypes.object,
};

export default IdentificationType;
