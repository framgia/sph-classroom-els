import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { RiArrowDropDownLine } from 'react-icons/ri';
import MultipleChoiceType from './components/MultipleChoiceType';
import IdentificationType from './components/IdentificationType';

import style from './index.module.scss';

const QuizEdit = () => {
  const [questionType, setQuestionType] = useState('multiple_choice');
  const [timeLimit, setTimeLimit] = useState(0);

  const quiz = {
    id: 1,
    title: 'Web Development Basics',
  };

  const questions = [
    {
      id: 1,
      question: 'What is HTML?',
      question_type: 'multiple choice',
      choices: [
        { description: 'Hypertext Markup Language' },
        { description: 'Hyper Text Mark Lauron' },
        { description: 'Hypertext Mixed Language' },
        { description: 'How To Make Lumpia' },
      ],
    },
    {
      id: 2,
      question: 'Tim Berners-Lee invented ______.',
      question_type: 'identification',
    },
  ];

  const question = (e) => {
    setQuestionType(e);
  };

  const time = (e) => {
    setTimeLimit(e);
  };

  const question_type = (choice) => {
    switch (choice) {
      case 'multiple_choice':
        return <MultipleChoiceType questions={questions[0]} />;
      case 'identification':
        return <IdentificationType questions={questions[1]} />;
      default:
        break;
    }
  };

  const choice = (option) => {
    switch (option) {
      case 'multiple_choice':
        return 'Multiple Choice';
      case 'identification':
        return 'Identification';
      default:
        break;
    }
  };

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
          <div>{question_type(questionType)}</div>
          <div className={style.formGap}>
            <Dropdown onSelect={question}>
              <Form>
                <Form.Label className={style.inputTitle}>
                  Question Type
                </Form.Label>
              </Form>
              <Dropdown.Toggle
                variant="link"
                id="dropdown-basic"
                bsPrefix="none"
                className={style.dropdownStyle}
              >
                {choice(questionType)}
                <RiArrowDropDownLine className={style.iconSize} />
              </Dropdown.Toggle>
              <Dropdown.Menu className={style.dropdownMenuStyle}>
                <Dropdown.Item eventKey={'multiple_choice'}>
                  Multiple Choice
                </Dropdown.Item>
                <Dropdown.Item eventKey="identification">
                  Identification
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <div className={style.formSpacing}>
              <Dropdown onSelect={time}>
                <Form>
                  <Form.Label className={style.inputTitle}>
                    Time Limit
                  </Form.Label>
                </Form>
                <Dropdown.Toggle
                  variant="link"
                  id="dropdown-basic"
                  bsPrefix="none"
                  className={style.dropdownStyle}
                >
                  {timeLimit} seconds
                  <RiArrowDropDownLine className={style.iconSize} />
                </Dropdown.Toggle>
                <Dropdown.Menu className={style.dropdownMenuStyle}>
                  <Dropdown.Item eventKey="5">5 seconds</Dropdown.Item>
                  <Dropdown.Item eventKey="10">10 seconds</Dropdown.Item>
                  <Dropdown.Item eventKey="20">20 seconds</Dropdown.Item>
                  <Dropdown.Item eventKey="30">30 seconds</Dropdown.Item>
                  <Dropdown.Item eventKey="60">60 seconds</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
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
