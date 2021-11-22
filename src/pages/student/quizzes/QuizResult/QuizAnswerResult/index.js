import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import style from './indexAnswer.module.css';
import MultipleChoiceType from './components/MultipleChoiceType';
import FillInTheBlankType from './components/FillInTheBlankType';
import { PropTypes } from 'prop-types';

import { QuestionsContext } from '../../QuestionList';

const QuizAnswerResult = ({ viewResultsPage, answers, score, total }) => {
  const [page, setPage] = useState(1);
  const { questions, title } = useContext(QuestionsContext);
  const [question, setQuestion] = useState(questions[page - 1]);
  const [answer, setAnswer] = useState(answers[page - 1]);

  const handlePrevButtonClick = () => {
    if (page <= 1) return;

    setPage(page - 1);
  };

  const handleNextButtonClick = () => {
    if (page >= questions.length) return;

    setPage(page + 1);
  };

  useEffect(() => {
    setAnswer(answers[page - 1]);
    setQuestion(questions[page - 1]);
  }, [page]);

  return (
    <div>
      <div>
        <Container>
          <Button
            variant='success'
            className={style.backBtn}
            onClick={viewResultsPage}
          >
            BACK
          </Button>

          <div className={style.Answertopic}>
            <p className={style.paragraph}>
              <b>Topic:</b> {title}
            </p>
            <Badge bg='light' className={style.tml}>
              <Card.Text className={style.score}>
                {' '}
                <span>
                  <b>{score}</b>
                </span>
                <b>/{total}</b>{' '}
              </Card.Text>
            </Badge>
          </div>
          <Card.Body className={style.wholeBodyCard}>
            {question &&
            question.question_type.question_type === 'Multiple Choice' ? (
                <MultipleChoiceType question={question} answer={answer} />
              ) : (
                <FillInTheBlankType question={question} answer={answer} />
              )}
            <hr />
            <div className={style.bottomBodyCard}>
              <p className={style.numItems}>
                {page} out of {questions?.length}
              </p>
              <div>
                {page > 1 ? (
                  <Button
                    variant='success'
                    className={style.prevBtn}
                    onClick={handlePrevButtonClick}
                  >
                    Prev
                  </Button>
                ) : (
                  ''
                )}
                <Button
                  variant='success'
                  className={style.nextBtn}
                  onClick={handleNextButtonClick}
                >
                  Next
                </Button>
              </div>
            </div>
          </Card.Body>
        </Container>
        <br />
      </div>
    </div>
  );
};

QuizAnswerResult.propTypes = {
  viewResultsPage: PropTypes.any,
  answers: PropTypes.object,
  score: PropTypes.number,
  total: PropTypes.number
};

export default QuizAnswerResult;
