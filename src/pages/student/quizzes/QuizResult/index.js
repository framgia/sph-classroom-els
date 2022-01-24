import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import style from './index.module.css';
import { PropTypes } from 'prop-types';
import QuizAnswerResult from './QuizAnswerResult';
import Recent from '../QuizResult/Recent/index';
import { QuestionsContext } from '../QuestionList';
import AnswerApi from '../../../../api/Answer';
import FriendsScoreApi from '../../../../api/FriendsScore';

const QuizResult = ({ score, total, quizId, categoryId }) => {
  const [viewResults, setViewResults] = useState(false);
  const { quizTakenId, title } = useContext(QuestionsContext);
  const [answers, setAnswers] = useState(null);
  const [friendsScore, setFriendsScore] = useState(null);
  const passing = total / 2;

  useEffect(() => {
    AnswerApi.getAll(quizTakenId).then(({ data }) => {
      setAnswers(data.data);
    });
    FriendsScoreApi.getAll(quizId).then(({ data }) => {
      setFriendsScore(data.data);
      console.log(data.data);
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
                    {score < passing ? (
                      <>
                        <div className={style.ResultquizPraise}>
                          Better Luck Next Time!
                        </div>
                        <div className={style.ResultquizRemarks}>
                          You Failed
                        </div>
                      </>
                    ) : (
                      <>
                        <div className={style.ResultquizPraise}>Great Job!</div>
                        <div className={style.ResultquizRemarks}>
                          You Passed
                        </div>
                      </>
                    )}
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
                  <Card.Header className={style.friendsTitle}>
                    <div className={style.texttittlestyle}>
                      Friend&apos;s Score
                    </div>
                    <hr className={style.hrstyle} />
                  </Card.Header>
                  <Card.Body className={style.cardbodystyle}>
                    {friendsScore?.map((friendScore, idx) => {
                      return (
                        <div key={idx}>
                          <div className={style.friendsScore}>
                            {friendScore.score}/{total}
                          </div>
                          <Link to={`/students/${friendScore.id}`}>
                            <tr>
                              <td>
                                {friendScore.avatar === null ? (
                                  <div>
                                    <img
                                      className={style.ResultsizeOfAvatar}
                                      alt="avatar"
                                      src="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"
                                    />
                                  </div>
                                ) : (
                                  <div>
                                    <img
                                      className={style.ResultsizeOfAvatar}
                                      alt="avatar"
                                      src={friendScore.avatar}
                                    />
                                  </div>
                                )}
                              </td>
                              <td className={style.friendsName}>
                                {friendScore.name}
                              </td>
                            </tr>
                          </Link>
                        </div>
                      );
                    })}
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
  categoryId: PropTypes.number
};

export default QuizResult;
