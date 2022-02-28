import React, { Fragment, useState } from 'react';
import Form from 'react-bootstrap/Form';
import style from '../../index.module.scss';
import { GrAddCircle } from 'react-icons/gr';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { PropTypes } from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
// import QuestionApi from '../../../../../../api/Question';

const MultipleChoiceType = ({ questions }) => {
  const { control } = useForm();
  const [addChoices, setAddChoices] = useState([]);
  // const [errors, setErrors] = useState({});

  // const handleOnSubmit = async ({ question, choice }) => {
  //   try {
  //     await QuestionApi.editQuestion({ question, choice });
  //   } catch (error) {
  //     if (error?.response?.data?.error || error?.response?.data?.errors) {
  //       setErrors(
  //         error?.response?.data?.error || error?.response?.data?.errors
  //       );
  //       console.log(errors);
  //     }
  //   }
  //   console.log(question);
  //   console.log(choice);
  // };

  const handleAddChoices = () => {
    setAddChoices(control);
  };
  return (
    <Fragment>
      <div>
        {/* <Form onSubmit={handleSubmit(handleOnSubmit)}> */}
        {questions === null ? (
          <Form>
            <Form.Label className={style.inputTitle}>Question</Form.Label>
            <Controller
              control={control}
              name="question"
              defaultValue=""
              render={({ field: { onChange, value, ref } }) => (
                <Form.Control 
                  onChange={onChange}
                  type="text"
                  className={style.inputWidth}
                  value={value}
                  ref={ref}
                />
              )}
            />
          </Form>
        ) : (
          <Form>
            <Form.Label className={style.inputTitle}>Question</Form.Label>
            {questions ? (
              <Controller
                control={control}
                name="question"
                defaultValue={questions.question}
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Control 
                    onChange={onChange}
                    // onChange={(e) => questions.question(e.target.value)}
                    type="text"
                    className={style.inputWidth}
                    value={value}
                    // value={questions.question}
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
        <div className={style.inputTitle}
          onClick = {() => handleAddChoices()}
        >
          Choices <GrAddCircle className={style.iconSize} />
        </div>
        <div>
          {addChoices && questions?.choices?.map((choice, idx) => (
            <Form key={idx} className={style.cardBody}>
              <div>
                <input type="radio" name="choice" />
                <span className={style.choicesAlignment}>
                  {questions?.choices ? (
                    <input
                      className={style.choicesInput}
                      control={control}
                      name="choice"
                      defaultValue={choice.choice}
                      render={({ field: { onChange,value, ref } }) => (
                        <Form.Control 
                          onChange={onChange}
                          type="text"
                          value={value}
                          ref={ref}
                        />
                      )}
                    />
                  ) : (
                    ''
                  )} 
                </span>
                <AiOutlineCloseCircle className={style.inputIconSize} /> 
              </div>
            </Form>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

MultipleChoiceType.propTypes = {
  questions: PropTypes.object,
};

export default MultipleChoiceType;
