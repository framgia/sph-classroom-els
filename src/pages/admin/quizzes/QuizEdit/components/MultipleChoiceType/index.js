import React, { Fragment, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import style from '../../index.module.scss';
import { GrAddCircle } from 'react-icons/gr';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { PropTypes } from 'prop-types';
import { Controller, useForm } from 'react-hook-form';

const MultipleChoiceType = ({ question }) => {
  const { control, handleSubmit } = useForm();
  const [selectedChoices, setselectedChoices] = useState(null);
  const [choices, setChoice] = useState([]);
  const [isCorrect, setIsCorrect] = useState();
  const [questionEdit, setQuesetionEdit] = useState([]);
  // const [editChoice, setEditChoice] = useState([]);

  // const onSelectedQuestion = (value) => {
  //   setQuesetionEdit([...editChoice,{type: type, id: choices.id, choices:value }]);
  // };
  // console.log(questionEdit);

  // const choiceTypes = [
  //   {
  //     type:'Add'
  //   },
  //   {
  //     type:'Edit'
  //   },
  //   {
  //     type:'Delete'
  //   }
  // ]

  const onSelectedQuestion = (value) => {
    setQuesetionEdit([...questionEdit,{id: question.id, question:value }]);
  };
  console.log(questionEdit);

  const onSelectCorrectAnswer = (e) => {
    setIsCorrect(e);
  };

  console.log(isCorrect);

  useEffect(() => {
    if (question) {
      setChoice(question.choices);
    }
  }, [question]);

  const onSelectedChoices = (e) => {
    setselectedChoices(
      choices.find((choice) => choice.id === e)
    );
  };

  const addChoicesFields = (e) => {
    setChoice([...choices, { e }]);
  };

  const removeChoicesFields = (e) => {
    let newchoices = [...choices];
    newchoices.splice(e, 1);
    setChoice(newchoices);
  };

  // const is_correct = ['1', '2'];
  return (
    <Fragment>
      <div onSubmit={handleSubmit(onSelectedQuestion)}>
        <Form>
          <Form.Label className={style.inputTitle}>Question</Form.Label>
          {question ? (
            <div>
              <Controller
                control={control}
                name="question"
                defaultValue={question.question}
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Control 
                    // onClick={() => {onSelectedQuestion(value);}}
                    onChange={onChange}
                    type="text"
                    className={style.inputWidth}
                    value={value}
                    ref={ref}
                  />
                )}
              />
            </div>
          ) : (
            ''
          )} 
        </Form>
      </div>
      <div className={style.formSpacing}>
        <div className={style.inputchoices}
        >
          Choices <GrAddCircle className={style.iconSize} onClick={() => addChoicesFields()} />
        </div>
        <div>
          {choices && choices.map((choice, idx) => {
            return(
              <Form onClick={() => {onSelectedChoices(choice.id);}} key={idx} className={style.cardBody}>
                <input onClick={() => onSelectCorrectAnswer(choice.is_correct)} type="radio" name="is_correct" value={isCorrect}/>
                <span className={style.choicesAlignment}>
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
                          value={selectedChoices.choice}
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
  question: PropTypes.object,
};

export default MultipleChoiceType;
