import React, { Fragment, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import style from '../../index.module.scss';
import { GrAddCircle } from 'react-icons/gr';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { PropTypes } from 'prop-types';
import { Controller, useForm } from 'react-hook-form';

const MultipleChoiceType = ({ question, getData }) => {
  const { control} = useForm();
  // const [selectedChoices, setselectedChoices] = useState({
  //   choices: question.choices,
  //   choice: question.choices.choice
  // });
  const [choices, setChoice] = useState([]);
  // const [isCorrect, setIsCorrect] = useState();
  const [questionOnChange, setQuestionOnChange ] = useState({
    question : question.question,
    questionId: question.id,
    choice: question.choices
  });

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

  useEffect(() => {
    if (question) {
      setChoice(question.choices);
    }

    setQuestionOnChange({
      ...questionOnChange,
      question: question.question,
      questionId: question.id
    });

  }, [question]);

  // const onSelectCorrectAnswer = (e) => {
  //   setIsCorrect(e);
  // };

  const handleChangeQuestion = (e) => {
    setQuestionOnChange({
      ...questionOnChange,
      question: e.target.value
    });
    getData(questionOnChange);
  };

  useEffect(() => {
    if(questionOnChange){
      getData(questionOnChange);
    }
  }, [questionOnChange]);

  // const handleChangeChoices = (e) => {
  //   setselectedChoices({
  //     ...selectedChoices,
  //     choices: e.target.value
  //   });
  //   getData(selectedChoices);
  // };
  // console.log(selectedChoices);
  
  // const onSelectedChoices = (e) => {
  //   setselectedChoices(
  //     choices.find((choice) => choice.id === e)
  //   );
  // };

  const addChoicesFields = (e) => {
    setChoice([...choices, { e }]);
  };

  const removeChoicesFields = (e) => {
    let newchoices = [...choices];
    newchoices.splice(e, 1);
    setChoice(newchoices);
  };

  // const is_correct = ['1', '2'];

  const handleChangeChoices = (e) => {
    setQuestionOnChange({
      ...questionOnChange,
      choice: e.target.value
    });
    getData(questionOnChange);
  };
  console.log(questionOnChange);
  
  useEffect(() => {
    if(questionOnChange){
      getData(questionOnChange);
    }
  }, [questionOnChange]);

  return (
    <Fragment>
      <div>
        <Form>
          <Form.Label className={style.inputTitle}>Question</Form.Label>
          <div>
            <Controller
              control={control}
              name="question"
              defaultValue={question.question}
              render={({ field: { ref } }) => (
                <Form.Control 
                  onChange={handleChangeQuestion}
                  type="text"
                  className={style.inputWidth}
                  value={questionOnChange.question}
                  ref={ref}
                />
              )}
            />
          </div>
        </Form>
      </div>
      {/* <div className={style.formSpacing}>
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
                      render={({ field: { ref } }) => (
                        <Form.Control 
                          onChange={handleChangeChoices}
                          type="text"
                          value={selectedChoices.choices}
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
      </div> */}
      <div className={style.formSpacing}>
        <Form>
          <Form.Label className={style.inputTitle}>
            Choices <GrAddCircle className={style.iconSize} onClick={() => addChoicesFields()}/>
          </Form.Label>
        </Form>
        {question &&  choices.map((choice, idx) => (
          <Form key={idx} className={style.cardBody}>
            <input type="radio" name="choice" className={style.radioAlignment}/>
            <Controller
              control={control}
              name="choice"
              defaultValue={choice.choice}
              render={({ field: { ref } }) => (
                <Form.Control 
                  className={style.choicesAlignment}
                  onChange={handleChangeChoices}
                  type="text"
                  value={choice.choice}
                  ref={ref}
                />
              )}
            /> 
            {/* {choice.choice} */}
            <AiOutlineCloseCircle className={style.inputIconSize} onClick={() => removeChoicesFields(idx)}/>
          </Form>
        ))}
      </div>
    </Fragment>
  );
};

MultipleChoiceType.propTypes = {
  question: PropTypes.object,
  getData: PropTypes.func
};

export default MultipleChoiceType;
