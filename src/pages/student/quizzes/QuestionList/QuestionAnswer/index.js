import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';
import Button from '../../../../../components/Button';
import MultipleChoiceType from './components/MultipleChoiceType';
import FillInTheBlankType from './components/FillInTheBlankType';
import QuizResult from '../../QuizResult';
import AnswerApi from '../../../../../api/Answer';
import QuizTaken from '../../../../../api/QuizTaken';
import style from './indexQuestion.module.scss';

import { QuestionsContext } from '..';

const QuestionAnswer = () => {
  const { categoryId, quizId } = useParams();
  const { questions, title, quizTakenId } = useContext(QuestionsContext);

  const [page, setPage] = useState(1);
  const [time, setTime] = useState(questions[page - 1]?.time_limit);
  const [question, setQuestion] = useState(questions[page - 1]);
  const [timeOutId, setTimeOutId] = useState(null);
  const [choice, setChoice] = useState(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [remainingTime, setRemainingTime] = useState(null);
  const [prevPage, setPrevPage] = useState(1);
  const [score, setScore] = useState(0);
  const [point, setPoint] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(false);
  const [timesUp, setTimesUp] = useState(false);

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

      setTextAnswer('');
      setChoice(null);
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
        setTimesUp(true);
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
    <div className="container">
      {showResult === false ? (
        <div className="d-flex justify-content-center align-items-center">
          <Card className={style.card}>
            <Card.Header id={style.cardHeader}>
              <a href={`/categories/${categoryId}/quizzes/${quizId}/questions`}>
                <BsFillArrowLeftSquareFill className={style.backButton} />
              </a>
              <div className={style.topic}>
                <center>{title}</center>
              </div>
            </Card.Header>
            <Card.Body className={style.cardBody}>
              <Badge bg="light" className={style.timer}>
                <Card.Text className={style.timeLimit}>
                  <span>Time Left: </span>
                  <b className={style.time}>{time}</b>
                </Card.Text>
              </Badge>
              {question &&
              question.question_type.question_type === 'Multiple Choice' ? (
                  <MultipleChoiceType
                    question={question}
                    time={time}
                    getAnswer={getAnswer}
                    getPoint={getPoint}
                  ></MultipleChoiceType>
                ) : (
                  <FillInTheBlankType
                    question={question}
                    time={time}
                    answer={textAnswer}
                    getAnswer={getAnswer}
                    getPoint={getPoint}
                  ></FillInTheBlankType>
                )}
              <hr className={style.spacing} />
              <div className={style.cardFooter}>
                <p className={style.numItems}>
                  {page} out of {questions?.length}
                </p>
                {page === questions?.length ? (
                  <Button
                    buttonLabel="Submit"
                    buttonSize="sm"
                    onClick={() => {
                      submitStatus || timesUp
                        ? ''
                        : storeLastAnswerAndGetTotalScore();

                      setSubmitStatus(true);
                    }}
                    disabled={submitStatus}
                  />
                ) : (
                  <Button
                    buttonLabel="Next"
                    buttonSize="sm"
                    onClick={handleNextButtonClick}
                  />
                )}
              </div>
            </Card.Body>
          </Card>
          <br />
        </div>
      ) : (
        <QuizResult
          score={score}
          total={questions.length}
          categoryId={parseInt(categoryId)}
          quizId={parseInt(quizId)}
        />
      )}
    </div>
  );
};

export default QuestionAnswer;
