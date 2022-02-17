import React, { Fragment } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import style from '../../index.module.scss';
import { GrAddCircle } from 'react-icons/gr';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { PropTypes } from 'prop-types';

const MultipleChoiceType = ({ questions }) => {
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
        <Form>
          <Form.Label className={style.inputTitle}>
            Choices <GrAddCircle className={style.iconSize} />
          </Form.Label>
        </Form>
        {questions?.choices?.map((choice, idx) => (
          <Card key={idx} className={style.cardBody}>
            <div>
              <input type="radio" name="choice" />
              <span className={style.choicesAlignment}>
                {choice.description}
              </span>
              <AiOutlineCloseCircle className={style.inputIconSize} />
            </div>
          </Card>
        ))}
      </div>
    </Fragment>
  );
};

MultipleChoiceType.propTypes = {
  questions: PropTypes.object,
};

export default MultipleChoiceType;
