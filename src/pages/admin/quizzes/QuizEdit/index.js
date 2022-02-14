import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

import style from './index.module.scss';

const QuizEdit = () => {
  const quiz = {
    id: 1,
    title: 'Web Development Basics'
  };

  const questions = [
    {
      id: 1,
      question: 'What is HTML?'
    },
    {
      id: 2,
      question: 'Tim Berners-Lee invented ______.'
    }
  ];

  return (
    <div className="d-inline-flex">
      <Container className={style.quizEditContainer}>
        <h2 className={style.quizTitle}>{quiz.title}</h2>
        <h3 className={style.quizCategory}>Web Development &gt; Basics</h3>
        <div className="d-flex">
          <div className={style.quizEditSidebar}>
            {questions &&
              questions.map((question, idx) => {
                return (
                  <Fragment key={idx}>
                    <Nav className="flex-column">
                      <Nav.Link className={style.navLinkItem} active>
                        <span className={style.questionNumber}>
                          Question #{idx + 1}
                        </span>
                        <p className={style.question}>{question.question}</p>
                      </Nav.Link>
                    </Nav>
                  </Fragment>
                );
              })}
            <Button className={style.sidebarButtons}>Add a Question</Button>
            <Button className={style.sidebarButtons}>Change Category</Button>
          </div>
          {/*************** INSERT <QUESTION FORM> CODE HERE ***************/}
        </div>
        <div className={style.confirmationButtons}>
          <Link to={`/admin/quizzes/${quiz.id}`} className={style.cancelButton}>
            Cancel
          </Link>
          <Button className={style.saveButton}>Save</Button>
        </div>
      </Container>
    </div>
  );
};

export default QuizEdit;
