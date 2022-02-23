import React, { Fragment } from 'react';
import Form from 'react-bootstrap/Form';
import style from '../../index.module.scss';
import { PropTypes } from 'prop-types';

const IdentificationType = ({ questions }) => {
  return (
    <Fragment>
      <div>
        <Form>
          <Form.Label className={style.inputTitle}>Question</Form.Label>
          <Form.Control
            type="title"
            className={style.inputWidth}
            value={`${questions.id}. ${questions.question}`}
          />
        </Form>
      </div>
      <div className={style.formSpacing}>
        <Form.Label className={style.inputTitle}>Answer</Form.Label>
        <Form.Control as="textarea" className={style.inputHeight} />
        {questions.text_answer}
      </div>
    </Fragment>
  );
};

IdentificationType.propTypes = {
  questions: PropTypes.object,
};

export default IdentificationType;
