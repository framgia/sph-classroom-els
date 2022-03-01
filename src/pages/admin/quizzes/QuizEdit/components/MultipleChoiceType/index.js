import React, { Fragment, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import style from '../../index.module.scss';
import { GrAddCircle } from 'react-icons/gr';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { PropTypes } from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
// import QuestionApi from '../../../../../../api/Question';

const MultipleChoiceType = ({ questions }) => {
  const { control } = useForm();
  const [selectedChoices, setselectedChoices] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [choices, setChoice] = useState([]);

  useEffect(() => {
    if (questions) {
      setChoice(questions.choices);
    }
    console.log(choices);
  }, [questions]);

  const onSelectQuestion = (e) => {
    setSelectedQuestion(
      find((question) => question.id === e)
    );
    console.log(selectedQuestion);
  };

  const onSelectedChoices = (e) => {
    setselectedChoices(
      choices.find((choice) => choice.id === e)
    );
    console.log(selectedChoices);
  };
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

  const addChoicesFields = (e) => {
    setChoice([...choices, { e }]);
  };

  const removeChoicesFields = (e) => {
    let newchoices = [...choices];
    newchoices.splice(e, 1);
    setChoice(newchoices);
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
              <div onSelect={onSelectQuestion}>
                <Controller
                  eventKey={questions.id}
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
              </div>
            ) : (
              ''
            )} 
          </Form>
        )}
      </div>
      <div className={style.formSpacing}>
        <div className={style.inputchoices}
        >
          Choices <GrAddCircle className={style.iconSize} onClick={() => addChoicesFields()} />
        </div>
        <div>
          {choices && choices.map((choice, idx) => {
            return(
              <Form onSelect={onSelectedChoices} key={idx} className={style.cardBody}>
                <input type="radio" name="choice" />
                <span eventKey={choice.id} className={style.choicesAlignment}>
                  {choices ? (
                    <input
                      className={style.choicesInput}
                      control={control}
                      name="choice"
                      defaultValue={choice.choice}
                      render={({ field: { onChange, ref } }) => (
                        <Form.Control 
                          onChange={onChange}
                          type="text"
                          value={choice.choice}
                          ref={ref}
                        />
                      )}
                    /> 
                  ) : (
                    ''
                  )}
                </span>
                <AiOutlineCloseCircle className={style.inputIconSize} onClick={() => removeChoicesFields(idx)}/>
              </Form>
            );})}
        </div>
      </div>
    </Fragment>
  );
};

MultipleChoiceType.propTypes = {
  questions: PropTypes.object,
  // choices: PropTypes.object,
};

export default MultipleChoiceType;
