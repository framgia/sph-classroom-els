import React, { useState, useEffect, useContext } from 'react';
import Button from '../../../../../components/Button';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import MultipleChoiceType from './components/MultipleChoiceType';
import FillInTheBlankType from './components/FillInTheBlankType';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';
import { PropTypes } from 'prop-types';
import style from './indexAnswer.module.scss';

import { QuestionsContext } from '../../QuestionList';

const QuizAnswerResult = ({
  answers,
  score,
  total,
  categoryId,
  viewResultsPage
}) => {
  const [page, setPage] = useState(1);
  const { questions, title } = useContext(QuestionsContext);
  const [question, setQuestion] = useState(questions[page - 1]);
  const [answer, setAnswer] = useState(answers[page - 1]);
  const passingScore = total / 2;

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
    <Card className={style.card}>
      <Card.Header id={style.cardHeader}>
        <BsFillArrowLeftSquareFill
          onClick={viewResultsPage}
          className={style.backButton}
        />
        <div className={style.title}>
          <span>{title}</span>
        </div>
      </Card.Header>
      <Card.Body className={style.cardBody}>
        <Badge bg="light" className={style.scoreDisplay}>
          <Card.Text className={style.scoreText}>
            <span>Score: </span>
            <span className={style.score}>
              <b
                className={
                  score < passingScore ? `${style.fail}` : `${style.pass}`
                }
              >
                {score}
              </b>
              <b> / {total}</b>
            </span>
          </Card.Text>
        </Badge>
        {question &&
        question.question_type.question_type === 'Multiple Choice' ? (
            <MultipleChoiceType question={question} answer={answer} />
          ) : (
            <FillInTheBlankType question={question} answer={answer} />
          )}
        <hr className={style.spacing} />
        <div className={style.cardFooter}>
          <p className={style.numItems}>
            {page} out of {questions?.length}
          </p>
          <div className={style.previewButtons}>
            {page > 1 ? (
              <Button
                buttonLabel="Prev"
                buttonSize="sm"
                onClick={handlePrevButtonClick}
              />
            ) : (
              ''
            )}
            {page === questions?.length ? (
              <a href={`/categories/${categoryId}/quizzes`}>
                <Button buttonLabel="Back to Quizzes" buttonSize="def" />
              </a>
            ) : (
              <Button
                buttonLabel="Next"
                buttonSize="sm"
                onClick={handleNextButtonClick}
              />
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

QuizAnswerResult.propTypes = {
  viewResultsPage: PropTypes.any,
  answers: PropTypes.array,
  score: PropTypes.number,
  total: PropTypes.number,
  categoryId: PropTypes.number
};

export default QuizAnswerResult;
