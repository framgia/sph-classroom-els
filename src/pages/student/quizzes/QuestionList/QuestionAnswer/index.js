import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import style from './indexQuestion.module.css';
import MultipleChoiceType from './components/MultipleChoiceType';
import FillInTheBlankType from './components/FillInTheBlankType';
import QuizResult from '../../QuizResult';
import { QuestionsContext } from '..';

import AnswerApi from '../../../../../api/Answer';
import QuizTaken from '../../../../../api/QuizTaken';

const QuestionAnswer = () => {
  const [page, setPage] = useState(1);
  const { categoryId, quizId } = useParams();
  const { questions, title, quizTakenId } = useContext(QuestionsContext);
  const [time, setTime] = useState(questions[page - 1]?.time_limit);
  const [question, setQuestion] = useState(questions[page - 1]);
  const [timeOutId, setTimeOutId] = useState(null);
  const [choice, setChoice] = useState(null);
  const [textAnswer, setTextAnswer] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [prevPage, setPrevPage] = useState(1);
  const [score, setScore] = useState(0);
  const [point, setPoint] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleNextButtonClick = () => {
    setPrevPage(page);

    if (page >= questions.length) return;

    setPage(page + 1);
  };

  useEffect(() => {
    if (questions != null) {
      setQuestion(questions[page - 1]);
    }

    if (page != prevPage) {
      setScore(score + point);

      AnswerApi.store({
        quizTakenId: quizTakenId,
        choiceId: choice,
        question_id: question.id,
        text_answer: textAnswer,
        text_correct: null,
        time_left: remainingTime
      });
    }

    window.clearTimeout(timeOutId);
    setTime(questions[page - 1]?.time_limit);
  }, [page]);

  useEffect(() => {
    QuizTaken.update(quizTakenId, score);
  }, [score]);

  const storeLastAnswerAndGetTotalScore = () => {
    window.clearTimeout(timeOutId);
    setScore(score + point);

    AnswerApi.store({
      quizTakenId: quizTakenId,
      choiceId: choice,
      question_id: question.id,
      text_answer: textAnswer,
      text_correct: null,
      time_left: remainingTime
    }).then(() => {
      setShowResult(!showResult);
    });
  };

  useEffect(() => {
    if (time != 0) {
      const timer = window.setTimeout(() => {
        setTime(time - 1);
      }, 1000);

      setTimeOutId(timer);
    }

    setRemainingTime(time);

    if (time === 0) {
      window.clearTimeout(timeOutId);

      if (page < questions?.length) {
        setTime(questions[page - 1]?.time_limit);
        setPage(page + 1);
      } else {
        storeLastAnswerAndGetTotalScore();
      }
    }
  }, [time]);

  const getAnswer = (answer) => {
    if (question.question_type.question_type === 'Multiple Choice') {
      setChoice(answer);
    } else {
      setTextAnswer(answer);
    }
  };

  const getPoint = (point) => {
    setPoint(point);
  };

  return (
    <div>
      {showResult === false ? (
        <div>
          <Container>
            <Button
              href={`/categories/${categoryId}/quizzes/${quizId}/questions`}
              id={style.backBtn}
            >
              BACK
            </Button>
            <div className={style.Answertopic}>
              <p className={style.paragraph}>
                <b>Topic:</b> {title}
              </p>
              <Badge bg='light' className={style.tml}>
                <Card.Text className={style.time}>
                  Time Left: <b className={style.timer}> {time} </b>
                </Card.Text>
              </Badge>
            </div>
            <Card.Body className={style.wholeBodyCard}>
              {question &&
              question.question_type.question_type === 'Multiple Choice' ? (
                  <MultipleChoiceType
                    question={question}
                    page={page}
                    time={time}
                    getAnswer={getAnswer}
                    getPoint={getPoint}
                  ></MultipleChoiceType>
                ) : (
                  <FillInTheBlankType
                    question={question}
                    page={page}
                    time={time}
                    getAnswer={getAnswer}
                    getPoint={getPoint}
                  ></FillInTheBlankType>
                )}
              <hr className={style.spacing} />
              <div className={style.bottomBodyCard}>
                <p className={style.numItems}>
                  {page} out of {questions?.length}
                </p>
                {page === questions?.length ? (
                  <Button
                    id={style.nextBtn}
                    onClick={() => {
                      storeLastAnswerAndGetTotalScore();
                    }}
                  >
                    {' '}
                    <span className={style.buttontext}>Submit</span>
                  </Button>
                ) : (
                  <Button id={style.nextBtn} onClick={handleNextButtonClick}>
                    <a href='#answer' className={style.buttontext}>
                      Next
                    </a>
                  </Button>
                )}
              </div>
            </Card.Body>
          </Container>
          <br />
        </div>
      ) : (
        <QuizResult
          score={score}
          total={questions.length}
          categoryId={categoryId}
          quizId={quizId}
        />
      )}
    </div>
  );
};

export default QuestionAnswer;
