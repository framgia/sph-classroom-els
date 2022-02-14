import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';

import { BsFillArrowLeftSquareFill } from 'react-icons/bs';

import MultipleChoiceAccordion from './components/MultipleChoiceAccordion';
import IdentificationAccordion from './components/IdentificationAccordion';

import style from './index.module.scss';

const QuizDetail = () => {
  const quiz = {
    id: 1,
    title: 'Web Development Basics'
  };

  const questions = [
    {
      id: 1,
      question_type: 'Multiple Choice',
      question: 'What is HTML?',
      time_limit: 10,
      choices: [
        {
          choice: 'How To Make Lumpia',
          isCorrect: false
        },
        {
          choice: 'HyperText Markup Language',
          isCorrect: true
        },
        {
          choice: 'Hyper Tell Mixed Language',
          isCorrect: false
        },
        {
          choice: 'Hyper Tale Mark Language',
          isCorrect: false
        }
      ]
    },
    {
      id: 2,
      question_type: 'Identification',
      question: 'Tim Berners-Lee invented ______.',
      time_limit: 20,
      correct_answer: 'World Wide Web'
    }
  ];

  return (
    <div className="d-inline-flex">
      <Container className={style.quizContainer}>
        <div className="flex-column">
          <div className="d-flex mb-5">
            <div className="d-flex gap-4 align-items-center">
              <BsFillArrowLeftSquareFill className={style.backButton} />
              <h1 className={style.quizTitle}>{quiz.title}</h1>
            </div>
            <Link
              to={`/admin/quizzes/${quiz.id}/edit`}
              className={style.editButton}
            >
              Edit Quiz
            </Link>
          </div>
          <h4 className={style.questionText}>Questions ({questions.length})</h4>
          {questions &&
            questions.map((question, idx) => {
              return (
                <Accordion key={idx} className="w-100" alwaysOpen>
                  {question.question_type === 'Multiple Choice' ? (
                    <MultipleChoiceAccordion
                      questionNumber={idx + 1}
                      question={question}
                    />
                  ) : (
                    <IdentificationAccordion
                      questionNumber={idx + 1}
                      question={question}
                    />
                  )}
                </Accordion>
              );
            })}
        </div>
      </Container>
    </div>
  );
};

export default QuizDetail;
