import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { BsFillArrowLeftSquareFill } from 'react-icons/bs';

import MultipleChoiceAccordion from './components/MultipleChoiceAccordion';
import IdentificationAccordion from './components/IdentificationAccordion';

import QuizApi from '../../../../api/Quiz';
import QuestionApi from '../../../../api/Question';

import style from './index.module.scss';

const QuizDetail = () => {
  const [quizInfo, setQuizInfo] = useState(null);
  const [questions, setQuestions] = useState(null);
  const { categoryId, quizId } = useParams();

  useEffect(() => {
    QuizApi.show({ categoryId, quizId }).then(({ data }) => {
      setQuizInfo(data.data);
    });

    QuestionApi.getAll(quizId).then(({ data }) => {
      setQuestions(data.data);
    });
    
  }, []);

  return (
    <div className="d-inline-flex">
      <Container className={style.quizContainer}>
        <div className="flex-column">
          <div className="d-flex mb-5">
            <div className="d-flex gap-4 align-items-center">
              <Link
                to={'/admin/quizzes'}
              >
                <BsFillArrowLeftSquareFill className={style.backButton} />
              </Link>
              <h1 className={style.quizTitle}>{quizInfo?.title}</h1>
            </div>
            <Link
              to={`/admin/quizzes/${quizId}/edit`}
              className={style.editButton}
            >
              Edit Quiz
            </Link>
          </div>
          <h4 className={style.questionText}>Questions ({questions?.length})</h4>
          {questions &&
            questions.map((question, idx) => {
              return (
                <Accordion key={idx} className="w-100" alwaysOpen>
                  {question.question_type_id === 1 ? (
                    <MultipleChoiceAccordion
                      questionNumber={idx + 1}
                      question={question}
                      choice = {1}
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
