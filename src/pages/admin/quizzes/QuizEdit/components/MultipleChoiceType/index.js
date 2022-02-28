import React, { Fragment } from 'react';
import Form from 'react-bootstrap/Form';
// import Card from 'react-bootstrap/Card';
import style from '../../index.module.scss';
import { GrAddCircle } from 'react-icons/gr';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { PropTypes } from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';
import { Controller, useForm } from 'react-hook-form';

const MultipleChoiceType = ({ questions }) => {
  // console.log(questions.choices);
  const { control } = useForm();
  return (
    <Fragment>
      <div>
        {questions === null ? (
          <div className={style.loading}>
            <Spinner animation="border" role="status"></Spinner>
            <span className={style.loadingWord}>Loading</span>
          </div>
        ) : (
          <Form>
            <Form.Label className={style.inputTitle}>Question</Form.Label>
            {questions ? (
              <Controller
                control={control}
                name="question"
                defaultValue={questions.question}
                render={({ field: { onChange, ref } }) => (
                  <Form.Control 
                    onChange={onChange}
                    type="text"
                    className={style.inputWidth}
                    // value={value}
                    value={questions.question}
                    ref={ref}
                  />
                )}
              />
            ) : (
              ''
            )} 
          </Form>
        )}
      </div>
      <div className={style.formSpacing}>
        <Form>
          <Form.Label className={style.inputTitle}>
            Choices <GrAddCircle className={style.iconSize} />
          </Form.Label>
        </Form>
        {questions?.choices?.map((choice, idx) => (
          <Form key={idx} className={style.cardBody}>
            <div>
              <input type="radio" name="choices" />
              {/* {questions?.choices ? (
                <Controller
                  control={control}
                  name="choices"
                  defaultValue={choice.choice}
                  render={({ field: { onChange, value, ref } }) => (
                    <Form.Control 
                      onChange={onChange}
                      type="text"
                      className={style.choicesAlignment}
                      value={value}
                      ref={ref}
                    />
                  )}
                />
              ) : (
                ''
              )}  */}
              <span className={style.choicesAlignment}>
                {choice.choice}
                {/* <input type="text" name="choice" value = {choice.choice} /> */}
                {/* {questions?.choices ? (
                  <input
                    className={style.choicesInput}
                    control={control}
                    name="choices"
                    defaultValue={choice.choice}
                    render={({ field: { onChange,value, ref } }) => (
                      <Form.Control 
                        onChange={onChange}
                        type="radio"
                        value={value}
                        ref={ref}
                      />
                    )}
                  />
                ) : (
                  ''
                )}  */}
              </span>
              <AiOutlineCloseCircle className={style.inputIconSize} />
              
            </div>
          </Form>
        ))}
      </div>
    </Fragment>
  );
};

MultipleChoiceType.propTypes = {
  questions: PropTypes.object,
};

export default MultipleChoiceType;
