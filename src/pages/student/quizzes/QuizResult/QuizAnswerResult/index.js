import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import style from './indexAnswer.module.css';
import MultipleChoiceType from './components/MultipleChoiceType';
import FillInTheBlankType from './components/FillInTheBlankType';
import { PropTypes } from 'prop-types';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';

import { QuestionsContext } from '../../QuestionList';

const QuizAnswerResult = ({
  answers,
  score,
  total,
  categoryId,
  viewResultsPage,
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
    <div>
      <div>
        <Card className={style.cardstyle1}>
          <Card.Header id={style.topicbg1}>
            <div className={style.topic1}>
              <BsFillArrowLeftSquareFill
                onClick={viewResultsPage}
                className={style.backarrow1}
              />
              <div className={style.title}>
                <center className={style.topicspan}>
                  <span>{title}</span>
                </center>
              </div>
            </div>
          </Card.Header>
          <Badge bg="light" className={style.tml1}>
            <div className={style.scorebg1}>Score</div>
            <Card.Text className={style.score1}>
              <span className={style.timeleftspace1}>
                <b
                  className={
                    score < passingScore ? `${style.fail}` : `${style.pass}`
                  }
                >
                  {score}
                </b>
              </span>
              <b>/ {total}</b>
            </Card.Text>
          </Badge>
          <Card.Body className={style.wholeBodyCard1}>
            {question &&
            question.question_type.question_type === 'Multiple Choice' ? (
                <MultipleChoiceType question={question} answer={answer} />
              ) : (
                <FillInTheBlankType question={question} answer={answer} />
              )}
            <hr />
            <div className={style.bottomBodyCard1}>
              <p className={style.numItems1}>
                {page} out of {questions?.length}
              </p>
              <div>
                {page > 1 ? (
                  <Button
                    className={style.button}
                    onClick={handlePrevButtonClick}
                  >
                    Prev
                  </Button>
                ) : (
                  ''
                )}
                {page === questions?.length ? (
                  <a href={`/categories/${categoryId}/quizzes`}>
                    <Button className={style.button1}>
                      <b>Back to Quizzes</b>
                    </Button>
                  </a>
                ) : (
                  <Button
                    className={style.nextButton}
                    onClick={handleNextButtonClick}
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          </Card.Body>
        </Card>
        <br />
      </div>
    </div>
  );
};

QuizAnswerResult.propTypes = {
  viewResultsPage: PropTypes.any,
  answers: PropTypes.array,
  score: PropTypes.number,
  total: PropTypes.number,
  categoryId: PropTypes.number,
};

export default QuizAnswerResult;
