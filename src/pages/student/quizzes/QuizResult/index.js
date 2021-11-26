import React, { useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import faker from 'faker';
import style from './index.module.css';
import { PropTypes } from 'prop-types';
import QuizAnswerResult from './QuizAnswerResult';
import Recent from '../QuizResult/Recent/index';

import { QuestionsContext } from '../QuestionList';
import AnswerApi from '../../../../api/Answer';

const QuizResult = ({ score, total, quizId, categoryId }) => {
  const [viewResults, setViewResults] = useState(false);
  const { quizTakenId, title } = useContext(QuestionsContext);
  const [answers, setAnswers] = useState(null);
  const passing = total / 2;

  useEffect(() => {
    AnswerApi.getAll(quizTakenId).then(({ data }) => {
      setAnswers(data.data);
    });
  }, []);

  const viewResultsPage = () => {
    setViewResults(!viewResults);
  };

  return (
    <div>
      {viewResults == false ? (
        <Container className={style.card}>
          <div>
            <div className={style.Resulttopic}>{title}</div>
            <Card.Body className={style.ResultwholeBodyCard}>
              <div className={style.ResultupperBodyCard}>
                <div className={style.ResultcardLeft}>
                  <div className={style.ResultscoreDisplay}>
                    <div className={style.ResultquizPraise}>Great Job!</div>
                    <div className={style.ResultquizRemarks}>You Passed</div>
                    <Card.Text className={style.Resultscore}>
                      {' '}
                      <span
                        className={
                          score < passing ? `${style.fail}` : `${style.pass}`
                        }
                      >
                        <b>{score}</b>
                      </span>
                      <b>/{total}</b>{' '}
                    </Card.Text>
                  </div>
                </div>
                <Card className={style.Resultcard2}>
                  <Card.Img variant="top" />
                  <Card.Body width="100px" style={{ margin: '5px' }}>
                    <center>
                      <Card.Title>Friend&apos;s Scores</Card.Title> <hr />
                    </center>
                    <Card.Text className={style.ResultfscoreCardText}>
                      <div className={style.ResultfriendScore}>
                        <a href="/#">
                          <img
                            className={style.ResultsizeOfAvatar}
                            alt="avatar"
                            src={faker.image.avatar()}
                          />
                        </a>
                        <p className={style.Resultparagraph}>Therese</p>
                        <p className={style.Resultparagraph}>10/10</p>
                      </div>
                      <div className={style.ResultfriendScore}>
                        <a href="/#">
                          <img
                            className={style.ResultsizeOfAvatar}
                            alt="avatar"
                            src={faker.image.avatar()}
                          />
                        </a>
                        <p className={style.Resultparagraph}>Harvey</p>
                        <p className={style.Resultparagraph}>10/10</p>
                      </div>
                      <div className={style.ResultfriendScore}>
                        <a href="/#">
                          <img
                            className={style.ResultsizeOfAvatar}
                            alt="avatar"
                            src={faker.image.avatar()}
                          />
                        </a>
                        <p className={style.Resultparagraph}>Erick</p>
                        <p className={style.Resultparagraph}>10/10</p>
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <hr className={style.ResulthrBreakButtom} />
              <div className={style.ResultbottomBodyCard}>
                <Button
                  onClick={() => viewResultsPage()}
                  id={style.ResultviewResultBtn}
                >
                  View Result
                </Button>
                <a
                  href={`/categories/${categoryId}/quizzes/${quizId}/questions`}
                >
                  <Button id={style.ResultretakeBtn}>Retake Quiz</Button>
                </a>
              </div>
            </Card.Body>
          </div>
          <div>
            <footer>
              <div>
                <h2 className={style.h2_style}>Related Quizzes</h2>
                <div className={style.bg}>
                  <Recent title="HTML" />
                  <Recent title="Linked List" />
                  <Recent title="Encapsulation" />
                  <Recent title="CSS" />
                </div>
              </div>
            </footer>
          </div>
        </Container>
      ) : answers ? (
        <QuizAnswerResult
          viewResultsPage={viewResultsPage}
          answers={answers}
          score={score}
          total={total}
          quizId={quizId}
          categoryId={categoryId}
        />
      ) : (
        ''
      )}
    </div>
  );
};

QuizResult.propTypes = {
  score: PropTypes.number,
  total: PropTypes.number,
  quizId: PropTypes.number,
  categoryId: PropTypes.number,
};
export default QuizResult;
