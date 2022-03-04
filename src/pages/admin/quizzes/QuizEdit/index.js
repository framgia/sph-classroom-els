import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import QuestionType from './components/QuestionType';
import { useParams } from 'react-router-dom';
// import MultipleChoiceType from './components/MultipleChoiceType';
// import IdentificationType from './components/IdentificationType';

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
  // const [newQuesetionItem, setNewQuestion] = useState(null);

  useEffect(() => {
    QuizApi.show({ categoryId, quizId }).then(({ data }) => {
      setQuizInfo(data.data);
    });

    QuestionApi.getAll(quizId).then(({ data }) => {
      setQuestions(data.data);
      setSelectedQuestion(data.data[0]);
      // setQuestions(questions.value);
    });
    
  }, []);

  // useEffect(() => {
  //   if (questions) {
  //     setQuestions(questions.title);
  //   }
  // }, [questions]);
  // console.log(newQuesetionItem);


  const onSelectQuestion = (e) => {
    setSelectedQuestion(
      questions.find((question) => question.id === parseInt(e))
    );
  };

  const addQuestionFields = (e) => {
    setQuestions([...questions, { e }]);
  };
  
  // const handleQuestionChange =({questionOnChange}) =>{
  //   setQuestions(question.value);
  // };

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
                          {/* {newQuesetion} */}
                          {/* <QuestionType question={selectedQuestion.question} /> */}
                          {question.question}
                          {/* <MultipleChoiceType question={question} />; */}
                          {/* <IdentificationType question={questions} />; */}
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
          <QuestionType question={selectedQuestion} />
        </div>
        <div className={style.confirmationButtons}>
          <Link to={`/admin/quizzes/${quizId}`} className={style.cancelButton}>
            Cancel
          </Link>
          <Button className={style.saveButton}>Save</Button>
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
