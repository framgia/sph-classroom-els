import React, { useState, useContext, useEffect } from 'react';
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
                          <tr>
                            <td>
                              <a href="/#">
                                <img
                                  className={style.ResultsizeOfAvatar}
                                  alt='avatar'
                                  src='https://scontent.xx.fbcdn.net/v/t1.15752-9/cp0/265084007_3017499151830196_5548700819143964530_n.png?_nc_cat=107&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeFhYUFZ_M3OjxyHYxh3GZc8daedD_rQFUB1p50P-tAVQMTn1NBlK9EWBmYt7gofEO_LHZpNpuHZTU-yrd7VClBO&_nc_ohc=gzF_EL0ur_kAX_0vVid&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVL4F5s2Pd2NNZdkJKSSuBVu2AGJDvUXoaNLfP0EQouCkg&oe=61E0DA5C'
                                />
                              </a>
                            </td>
                            <td className={style.friendsName}>
                              {friendScore.name}
                            </td>
                          </tr>
                        </div>
                      );
                    })}
                    {friendsScore?.length === 0 ? (
                      <div className={style.centerWord}>
                        <center>
                          <span>No Followed User</span>
                        </center>
                      </div>
                    ) : (
                      ''
                    )}
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
