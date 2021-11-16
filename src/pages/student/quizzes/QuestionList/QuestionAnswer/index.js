import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import style from './indexQuestion.module.css';
import MultipleChoiceType from './components/MultipleChoiceType';
import FillInTheBlankType from './components/FillInTheBlankType';
import { QuestionsContext } from '..';

const QuestionAnswer = () => {
  const [page, setPage] = useState(1);
  const { categoryId, quizId } = useParams(); 
  const { questions, title } = useContext(QuestionsContext);
  const [time, setTime] = useState(questions[page - 1].time_limit);
  const [question, setQuestion] = useState(questions[page - 1]);
  const [timeOutId, setTimeOutId] = useState(null);

  const handlePrevButtonClick = () => {
    if (page <= 1) return;

    setPage(page - 1);
  };

  const handleNextButtonClick = () => {
    if (page >= questions.length) return;

    setPage(page + 1);
  };

  useEffect(() => {
    console.log(question);

    if(questions != null){
      setQuestion(questions[page - 1]);
    }

    window.clearTimeout(timeOutId);
    setTime(questions[page - 1].time_limit);
  }, [page]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setTime(time - 1);
    }, 1000);

    setTimeOutId(timer);

    if(time === 0){
      window.clearTimeout(timeOutId);

      if(page != questions?.length){
        setTime(questions[page - 1].time_limit);
        setPage(page + 1);
      }else{
        window.location = `/categories/${categoryId}/quizzes/${quizId}/results`;
      }
    }
  }, [time]);

  return (
    <div>
      <div>
        <Container>
          <Button
            href={`/categories/${categoryId}/quizzes/${quizId}/questions`}
            id={style.backBtn}>
                        BACK
          </Button>
          <div className={style.Answertopic}>
            <p className={style.paragraph}>
              <b>Topic:</b> {title}
            </p>
            <Badge bg="light" className={style.tml}>
              <Card.Text className={style.time}>
                                Time Left:  <b className={style.timer}> {time} </b>
              </Card.Text>
            </Badge>
          </div>
          <Card.Body className={style.wholeBodyCard}>
            {question && question.question_type.question_type === 'Multiple Choice' ? (
              <MultipleChoiceType question={question} page={page}></MultipleChoiceType>
            ) : (
              <FillInTheBlankType question={question} page={page}></FillInTheBlankType>
            )}
            <hr className={style.spacing} />
            <div className={style.bottomBodyCard}>
              <p className={style.numItems}>
                {page} out of {questions?.length}
              </p>

              {page === 1 ? '' : (<Button
                id={style.prevBtn}
                onClick={handlePrevButtonClick}
              >
                <a href="#" className={style.buttontext}>Prev</a>
              </Button>)}

              {page === questions?.length ? (<Button
                id={style.nextBtn}
                href={`/categories/${categoryId}/quizzes/${quizId}/results`} > <span className={style.buttontext}>Submit</span>
              </Button>) :
                (<Button
                  id={style.nextBtn}
                  onClick={handleNextButtonClick}
                >
                  <a href="#answer" className={style.buttontext}>Next</a>
                </Button>)}
            </div>
          </Card.Body>
        </Container>
        <br />
      </div>
    </div>
  );
};

export default QuestionAnswer;
