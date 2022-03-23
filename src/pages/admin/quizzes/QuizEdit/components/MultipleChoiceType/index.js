import React, { Fragment, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import style from '../../index.module.scss';
import { GrAddCircle } from 'react-icons/gr';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { PropTypes } from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import InputField from '../../../../../../components/InputField';

const MultipleChoiceType = ({ question, getData, onUpdateChoices }) => {
  const { control } = useForm();
  const [choices, setChoices] = useState([]);
  const [questionOnChange, setQuestionOnChange] = useState({
    question: question.question,
    questionId: question.id,
    choices: question.choices
  });

  useEffect(() => {
    if (question) {
      setChoices(question.choices);
    }

    setQuestionOnChange({
      ...questionOnChange,
      question: question.question,
      questionId: question.id
    });
  }, [question]);

  const handleChangeQuestion = (e) => {
    setQuestionOnChange({
      ...questionOnChange,
      question: e.target.value
    });
    getData(questionOnChange);
  };

  useEffect(() => {
    if (questionOnChange) {
      getData(questionOnChange);
    }
  }, [questionOnChange]);

  const addChoicesFields = () => {
    // Condition in place in case there is a question with no choices yet
    // If the choices in a question is not empty then map all elements and return choice.id
    // Else, return [0] as a starting id
    const choiceIds = choices.length > 0 ? choices.map((choice) => choice.id) : [0];
    const maxId = Math.max(...choiceIds) + 1;
    setChoices([
      ...choices,
      {
        id: maxId,
        question_id: question.id,
        choice: '',
        is_correct: false
      }
    ]);
  };

  useEffect(() => {
    if (question) {
      onUpdateChoices(choices, question.id);
    }
  }, [choices]);

  const removeChoicesFields = (idx) => {
    let newChoices = [...choices];
    newChoices.splice(idx, 1);
    setChoices(newChoices);
  };

  const handleChangeChoices = (e, choiceId) => {
    let updateChoices = choices.map((choice) => {
      if (choice.id === choiceId) {
        return {
          ...choice,
          choice: e.target.value
        };
      }
      return choice;
    });
    setChoices(updateChoices);
  };

  useEffect(() => {
    if (questionOnChange) {
      getData(questionOnChange);
    }
  }, [questionOnChange]);

  const changeCorrectAnswer = (e, choiceId) => {
    let updateCorrectAnswer = choices.map((choice) => {
      if (choice.id === choiceId) {
        // Only one is true
        return {
          ...choice,
          is_correct: true
        };
      }
      // Other choices are returned false
      return {
        ...choice,
        is_correct: false
      };
    });
    setChoices(updateCorrectAnswer);
  };

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
                <InputField
                  onChange={handleChangeQuestion}
                  type="text"
                  inputStyle={style.inputWidth}
                  value={questionOnChange.question}
                  ref={ref}
                />
              )}
            />
          </div>
        </Form>
      </div>
      <div className={style.formSpacing}>
        <Form>
          <Form.Label className={style.inputTitle}>
            Choices
            <GrAddCircle
              className={style.iconSize}
              onClick={() => addChoicesFields()}
            />
          </Form.Label>
        </Form>
        {question && choices.map((choice, idx) => (
          <Form key={idx} className={style.cardBody}>
            <Form.Check
              className={style.radioStyle}
              type="radio"
              id={choice.id}
              onChange={(e) => changeCorrectAnswer(e, choice.id)}
              checked={choice.is_correct}
            />
            <Controller
              control={control}
              name="choice"
              defaultValue={choice.choice}
              render={({ field: { ref } }) => (
                <InputField
                  inputStyle={style.choicesAlignment}
                  onChange={(e) => handleChangeChoices(e, choice.id)}
                  type="text"
                  value={choice.choice}
                  ref={ref}
                />
              )}
            />
            <AiOutlineCloseCircle
              className={style.removeChoiceIcon}
              onClick={() => removeChoicesFields(idx)}
            />
          </Form>
        ))}
      </div>
    </Fragment>
  );
};

MultipleChoiceType.propTypes = {
  question: PropTypes.object,
  getData: PropTypes.func,
  onUpdateChoices: PropTypes.func
};

export default MultipleChoiceType;
