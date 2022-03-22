import React, { useState, useContext, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from '../../../../components/Button';
import QuizAnswerResult from './QuizAnswerResult';
import Recent from '../QuizResult/Recent/index';
import FriendsScoreApi from '../../../../api/FriendsScore';
import AnswerApi from '../../../../api/Answer';
import QuizApi from '../../../../api/Quiz';
import style from './index.module.scss';

import { QuestionsContext } from '../QuestionList';

const QuizResult = ({ score, total, quizId, categoryId }) => {
  const [viewResults, setViewResults] = useState(false);
  const { quizTakenId, title } = useContext(QuestionsContext);
  const [answers, setAnswers] = useState(null);
  const [friendsScore, setFriendsScore] = useState(null);
  const [quizRelated, setQuizRelated] = useState(null);
  const [quizzes, setQuizzes] = useState(null);
  const passing = total / 2;

  useEffect(() => {
    AnswerApi.getAll(quizTakenId).then(({ data }) => {
      setAnswers(data.data);
    });

    FriendsScoreApi.getAll(quizId).then(({ data }) => {
      setFriendsScore(data.data);
    });

    QuizApi.getRelatedQuizzes(categoryId, quizId).then(({ data }) => {
      setQuizRelated(data.relatedQuizzes);
      setQuizzes(data.attempts);
    });
  }, []);

  const viewResultsPage = () => {
    setViewResults(!viewResults);
  };

  const getAllQuizzesTakenForEveryRecentQuiz = (quiz_id) => {
    const quizzesList = quizzes?.filter((quiz) => quiz.quiz_id === quiz_id);

    return quizzesList;
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      {viewResults == false ? (
        <Container className={style.card}>
          <div className="d-flex justify-content-center align-items-center">
            <Card>
              <div className={style.resultTopic}>{title}</div>
              <Card.Body className={style.resultWholeBodyCard}>
                <div className={style.resultUpperBodyCard}>
                  <div className={style.resultCardLeft}>
                    <div className={style.resultScoreDisplay}>
                      {score < passing ? (
                        <>
                          <div className={style.resultQuizPraise}>
                            Better Luck Next Time!
                          </div>
                          <div className={style.resultQuizRemarks}>
                            You Failed
                          </div>
                        </>
                      ) : (
                        <>
                          <div className={style.resultQuizPraise}>
                            Great Job!
                          </div>
                          <div className={style.resultQuizRemarks}>
                            You Passed
                          </div>
                        </>
                      )}
                      <Card.Text className={style.resultScore}>
                        <span
                          className={
                            score < passing ? `${style.fail}` : `${style.pass}`
                          }
                        >
                          <b>{score}</b>
                        </span>
                        <b>/{total}</b>
                      </Card.Text>
                    </div>
                  </div>
                  {friendsScore?.length > 0 ? (
                    <Card className={style.friendsScoreCard}>
                      <Card.Header className={style.friendsTitle}>
                        <div className={style.friendsScoreText}>
                          Friend&apos;s Score
                        </div>
                        <hr className={style.divider} />
                      </Card.Header>
                      <Card.Body className={style.friendsScoreCardBody}>
                        {friendsScore?.map((friendScore, idx) => {
                          return (
                            <div key={idx}>
                              <Link
                                to={`/students/${friendScore.id}`}
                                className={style.friendsScoreInfo}
                              >
                                <div>
                                  <img
                                    className={style.friendsAvatar}
                                    alt="avatar"
                                    src={
                                      friendScore.avatar
                                        ? friendScore.avatar_url
                                        : 'https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png'
                                    }
                                  />
                                </div>

                                <div className={style.friendsName}>
                                  {friendScore.name}
                                </div>

                                <div className={style.friendsScore}>
                                  {friendScore.score}/{total}
                                </div>
                              </Link>
                            </div>
                          );
                        })}
                      </Card.Body>
                    </Card>
                  ) : (
                    ''
                  )}
                </div>
                <hr />
                <div className={style.resultsButtons}>
                  <Button
                    buttonLabel="View Result"
                    buttonSize="def"
                    onClick={() => viewResultsPage()}
                  />
                  <a
                    href={`/categories/${categoryId}/quizzes/${quizId}/questions`}
                  >
                    <Button buttonLabel="Retake Quiz" buttonSize="def" />
                  </a>
                </div>
              </Card.Body>
            </Card>
          </div>
          <footer>
            <h2 className={style.relatedQuizzesText}>Related Quizzes</h2>
            <div className={style.relatedQuizzes}>
              {quizzes &&
                quizRelated?.map((relatedQuiz, idx) => {
                  return (
                    <Recent
                      relatedQuiz={relatedQuiz}
                      quizzes={getAllQuizzesTakenForEveryRecentQuiz(
                        relatedQuiz.quiz_id
                      )}
                      key={idx}
                    />
                  );
                })}
            </div>
          </footer>

          {quizRelated?.length === 0 ? (
            <div className={style.noRelatedQuizzesMessageContainer}>
              <center>
                <span>No Related Quizzes</span>
              </center>
            </div>
          ) : (
            ''
          )}
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
  categoryId: PropTypes.number
};

export default QuizResult;
