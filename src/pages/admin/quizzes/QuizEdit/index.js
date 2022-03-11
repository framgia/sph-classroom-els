import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import QuestionType from './components/QuestionType';
import { useParams } from 'react-router-dom';
import { useToast } from '../../../../hooks/useToast';

import style from './index.module.scss';
import ChangeLocation from '../../../../components/ChangeLocation';

import QuizApi from '../../../../api/Quiz';
import QuestionApi from '../../../../api/Question';

const QuizEdit = () => {
  const TYPE = 'withPathDisplay';
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [location, setLocation] = useState(null);
  const [locationPathDisplay, setLocationPathDisplay] = useState('');
  const [quizInfo, setQuizInfo] = useState(null);
  const { categoryId, quizId } = useParams();
  const [questions, setQuestions] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const toast = useToast();

  useEffect(() => {
    QuizApi.show({ categoryId, quizId }).then(({ data }) => {
      setQuizInfo(data.data);
    });

    QuestionApi.getAll(quizId).then(({ data }) => {
      setQuestions(data.data);
      setSelectedQuestion(data.data[0]);
    });

  }, []);

  const changeQuestion = (value) => {
    const updateQuestion = questions.map( question =>
    {
      if (question.id === value.questionId){
        return {...question, question: value.question, text_answer: value.answer, choices: value.choices};
      }
      return question;  
    });

    setQuestions(updateQuestion);
  };

  // Function will trigger if the question time limit is updated
  const changeTimeLimit = (newTime, questionId) => {
    const updateTimeLimit = questions.map(question => {
      if (question.id === questionId) {
        return {
          ...question,
          time_limit: parseInt(newTime)
        };
      }
      return question;
    });
    setQuestions(updateTimeLimit);
  };

  // Function will trigger if the question type is updated
  const changeQuestionType = (newType, questionId) => {
    const updateQuestionType = questions.map(question => {
      if (question.id === questionId) {
        return {
          ...question,
          question_type_id: parseInt(newType)
        };
      }
      return question;
    });
    setQuestions(updateQuestionType);
  }; 

  // Function will trigger if the choices are updated
  const changeChoices = (choices, questionId) => {
    const updateChoices = questions.map(question => {
      if (question.id === questionId) {
        return {
          ...question,
          choices: choices
        };
      }
      return question;
    });
    setQuestions(updateChoices);
  };

  const onSelectQuestion = (e) => {
    setSelectedQuestion(
      questions.find((question) => question.id === parseInt(e))
    );
  };

  const addQuestionFields = () => {
    const questionIds = questions && questions.length > 0 ? questions.map(question => question.id) : [0];
    const maxId = Math.max(...questionIds) + 1;
    let newQuestions = [...questions];
    newQuestions.push(
      {
        choices: [],
        id: maxId,
        question: '',
        question_type_id: 1,
        quiz_id: quizId,
        text_answer: '',
        time_limit: 5
      }
    );
    setQuestions(newQuestions);
  };

  const handleSubmit = () => {
    toast('Processing', 'Updating questions...');

    QuestionApi.editQuestion(questions, quizId)
      .then(({ data }) => {
        setQuestions(data);
        toast('Success', 'Successfully updated questions');
      })
      .catch(error => {
        toast('Error', error);
      });
  };

  return (
    <div className="d-inline-flex">
      <Container className={style.quizEditContainer}>
        <h2 className={style.quizTitle}>{quizInfo?.title}</h2>
        <h3 className={style.quizCategory}>{locationPathDisplay}</h3>
        <div className="d-flex">
          <div className={style.quizEditSidebar}>
            {questions &&
              questions.map((question, idx) => {
                return (
                  <Fragment key={idx}>
                    <Nav className="flex-column" onSelect={onSelectQuestion}>
                      <Nav.Link
                        eventKey={question.id}
                        className={style.navLinkItem}
                        active
                      >
                        <span className={style.questionNumber}>
                          Question # {idx + 1}
                        </span>
                        <p key={idx} className={style.question}>
                          {question.question}
                        </p>
                      </Nav.Link>
                    </Nav>
                  </Fragment>
                );
              })}
            <Button className={style.sidebarButtons} onClick={() => addQuestionFields()} >Add a Question</Button>
            <Button className={style.sidebarButtons} onClick={handleShow}>
              Change Category
            </Button>
          </div>
          <QuestionType 
            question={selectedQuestion}
            onGetData={changeQuestion}
            onChangeTimeLimit={changeTimeLimit}
            onChangeQuestionType={changeQuestionType}
            onChangeChoices={changeChoices}
          />
        </div>
        <div className={style.confirmationButtons}>
          <Link to={`/admin/quizzes/${quizId}`} className={style.cancelButton}>
            Cancel
          </Link>
          <Button className={style.saveButton} onClick={handleSubmit}>Save</Button>
        </div>
      </Container>
      <ChangeLocation
        show={show}
        handleClose={handleClose}
        location={location}
        setLocation={setLocation}
        setLocationPathDisplay={setLocationPathDisplay}
        type={TYPE}
      />
    </div>
  );
};

export default QuizEdit;
