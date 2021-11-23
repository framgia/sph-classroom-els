import React, { useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import faker from 'faker';
import style from './index.module.css';
import { PropTypes } from 'prop-types';
import QuizAnswerResult from './QuizAnswerResult';

import { QuestionsContext } from '../QuestionList';
import AnswerApi from '../../../../api/Answer';

const QuizResult = ({ score, total, quizId, categoryId }) => {
  const [viewResults, setViewResults] = useState(false);
  const { quizTakenId,title } = useContext(QuestionsContext);
  const [answers, setAnswers] = useState(null);

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
        <Container>
          <div className={style.Resulttopic}>
            <p className={style.Resultparagraph}>
              <b>Topic:</b> {title}
            </p>
            <Badge bg='light' className={style.Resulttml}>
              <div>
                <p className={style.spanForTimeLeft}>Time Left:</p>
              </div>
              <Badge bg='secondary' className={style.Resulttimer}>
                00:00
              </Badge>
            </Badge>
          </div>
          <Card.Body className={style.ResultwholeBodyCard}>
            <div className={style.ResultupperBodyCard}>
              <div className={style.ResultcardLeft}>
                <div className={style.ResultscoreDisplay}>
                  <Card.Title className={style.ResultquizPraise}>
                    Great Job!
                  </Card.Title>
                  <Card.Text className={style.Resultscore}>
                    {' '}
                    <span>
                      <b>{score}</b>
                    </span>
                    <b>/{total}</b>{' '}
                  </Card.Text>
                </div>
                <Button
                  onClick={() => viewResultsPage()}
                  variant='success'
                  className={style.ResultviewResultBtn}
                >
                  View Result
                </Button>
              </div>
              <Card className={style.Resultcard2}>
                <Card.Img variant='top' />
                <Card.Body>
                  <center>
                    <Card.Title>Friend&apos;s Scores</Card.Title>{' '}
                    <hr className={style.ResulthrBreak} />
                  </center>
                  <Card.Text className={style.ResultfscoreCardText}>
                    <div className={style.ResultfriendScore}>
                      <a href='/#' className={style.Resultavatar}>
                        <img
                          className={style.ResultsizeOfAvatar}
                          alt='avatar'
                          src={faker.image.avatar()}
                        />
                      </a>
                      <p className={style.Resultparagraph}>Therese</p>
                      <p className={style.Resultparagraph}>10/10</p>
                    </div>
                    <div className={style.ResultfriendScore}>
                      <a href='/#' className={style.Resultavatar}>
                        <img
                          className={style.ResultsizeOfAvatar}
                          alt='avatar'
                          src={faker.image.avatar()}
                        />
                      </a>
                      <p className={style.Resultparagraph}>Harvey</p>
                      <p className={style.Resultparagraph}>10/10</p>
                    </div>
                    <div className={style.ResultfriendScore}>
                      <a href='/#' className={style.Resultavatar}>
                        <img
                          className={style.ResultsizeOfAvatar}
                          alt='avatar'
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
              <p className={style.ResultnumItems}>
                {total} out of {total}
              </p>
              <a href={`/categories/${categoryId}/quizzes/${quizId}/questions`}>
                <Button variant='success' className={style.ResultretakeBtn}>
                  Retake Quiz
                </Button>
              </a>
            </div>
          </Card.Body>

          <footer className={style.Resultfooter}>
            <div className={style.ResultrelatedQuizzes}>
              <b>Related Quizzes</b>
            </div>
            <Card className={style.ResultfooterCard}>
              <Card.Body>
                <Button
                  variant='success'
                  className={style.ResultfooterCardContainer}
                >
                  <a className={style.Resultavatar}>
                    <img
                      className={style.ResultsizeOfAvatarFooter}
                      alt='avatar'
                      src='https://icon-library.com/images/html-5-icon/html-5-icon-6.jpg'
                    />
                  </a>
                  HTML
                </Button>
                <Button
                  variant='success'
                  className={style.ResultfooterCardContainer}
                >
                  <a className={style.Resultavatar}>
                    <img
                      className={style.ResultsizeOfAvatarFooter}
                      alt='avatar'
                      src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAhFBMVEUAAAD///+qqqr7+/vQ0NDLy8teXl5oaGjW1tbu7u5kZGTZ2dnx8fHT09PIyMi3t7ePj48gICAODg5ubm53d3c1NTXi4uJNTU2hoaG9vb2ysrLm5uZbW1vAwMBzc3OWlpaGhoZGRkYtLS2BgYE/Pz8cHBweHh4oKChLS0sVFRVBQUGcnJxj+1INAAAGIklEQVR4nO2ca3uqOhBGQaq7tlTwgncram3r9v//v6P2CswkE5Qk+zzv+lqlWRJymZkQBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAw2G73fYHrlvRCNnwOGuPw0+icXs+2vhnumtVmf8VfHEz/Xb7TXc18kyyRzWzo/3a6JH63ufNnL1YaLiYWoajmPe70M6sNF5EDcPOQuN3pmWp/XrMDROB34nxxpaCBlPDF8kN/GBoz0KFoeGD2O9EatGDx8zw2UQwDNc2TTiMDDtmgmGYWzThMDHMIlPDcGTXhoI0fKA/2zUWDMOlXR0CA0PhNFEk7lsWqiA3NH4IP+jZNirTFhuSC20BuV2hCmLDUU3BMHyzLlVAbFj3Fp6W4dalCkgNJ/UF/5F7OGMNxq30eZgfe/SOqvvHvlMRqSE32c9/thDPxK7Yg02U0HBJ+8WTwqd2pd9hPKlcyD5CwzUtWA7JvBXGIz/2FncyQ3JhQC3JfnrqoyeRDNKwOjqQS9IVcb3B5yejvPGmC5EZDsiBktzEby5/unO+HP1GZkjum+IDecXj6QZ6sGn6RmZIzvdd5pLxyp8bGEgNycliwVzSkxHmiysMuXvoGVf00sirzsjyJDJ8IRdtTLDDM2SGr+RscXTRYGNkhvSMX1m0eYnQ8J76WDhz0GBjhIZT0jCcOmixKeTNqRpyUZq5gyYbIjQMGMNw4cMWUInUkM9qJ1v7rTZBapiyhmE0f7XfbjmkITGVD3jDEzNJ9YYjpIbBSqkY3juPqXGQzxdlqA2YLlI/FwBiQzpmVSBqOQ7+ksgN/2oNT9y5zxeWkRsGLYli+OhTBOOMgaE0B9zd2VXQYGK4kRmeHH26jyaGBjnEhT/Po5EhE9wnWfmymDMzNFH0JeptaBjs5IrhkxehKlPDYGJQVRP5ULxHpufV9aUmdTUeVLbVMAyGBtVfiR0NBXUMpcubC84rhuoZBu/6dbgvijUNg2CpqNYv4jhaRbZTYmjg6Daff4Xhaeag0/sVnMbjrjIMgqylO3pxhss0WoGM08gNg+CQCqr3XfZTcSRKwVLbWSOHIRxh3kKDtrM6THDcxvDcWZXrVYcZcTLLXW/BvFPdR3fhVNLwuebFUn7B6m5lc1PD4JUtQ3XXTUnDKwJJ7A7Z2alL0vCacOCE6anOQow3N+QSHM5WbrfupQEXrXIWQm3AkK4JdzbnkyvvKw3JCICzXSK5A1bMFv1cf03yHKazgA251uIXIHkkuMHkWEOVTFuBfGa4pMPyslHS7hNe7BseEvbsEdUYZmTPPqNPY92/e6eu2WiF2HlJzGz5+qQhdZT+8DN+6AYNMkXV4HOYXSYEJpBAH5sk6pgLGwfNlp0Mijd3Puir5o6ej8hCoO6+/LFlachVL3rIXy2/hQzBw89YST5cZBCj/KBl1SiFSpGuY2xm1fb2u8yH2r/QB7aeBC3mlyjMeeFGClFKG9Kn6ifomG7hkeF27veVrvwBs7doIqA4qUT57sszGZMn+z2nKzKiR2pi5JLEtx9KD3Pi33QLD8OAK1UrbFYVwZd4WirY6+/Y2OnN4zTcW4CS79Yf1lzbiw+sOq39ePxa/7x20jb/a9y86F2Rpo17rel0OlcczS7NXNr8SxTFcaRJmt68kw51rVJRGtfp0ySG3L7+lD49IKIy6pmUXzA0cCR/U781eeVizFEEA5o4zkYNpSJi4mLCNCFLM2vSOi+TOZNTF7ui04eNpQ9rvuaBbs1B/oYvgvdmDFXnBxQwM/P2igG1ucKoOu8EYje3/bq9vtFgt/kAoQhQ7MlMo568QUFJeX2RrnKLY1AI9UPTeUP+nSsUsabotSOpuyiwaP5ct0HFazim3yDwG8O538q7Wx7EI4Qo3JcZ9Io7S4ehBrLVjfhFD5nwcby3WMuekfmlIkZ5k51+Q2X7RbuTmXLCjhLTAWGbPvGjTrfnIle4zdnpbLyuFQbbL9ft6jZ63E6Xzuqf9sOk0rvi3vGq8XyfdfLpPJmtZsm8lf55YeJvNtkO02krSWZJ67h+9uql1AAAAAAAAAAAwP+W/wA5rEutfvF8eAAAAABJRU5ErkJggg=='
                    />
                  </a>
                  JavaScript
                </Button>
                <Button
                  variant='success'
                  className={style.ResultfooterCardContainer}
                >
                  <a className={style.Resultavatar}>
                    <img
                      className={style.ResultsizeOfAvatarFooter}
                      alt='avatar'
                      src='https://www.nicepng.com/png/detail/222-2229388_css-css-logo-website-comments-html-css-javascript.png'
                    />
                  </a>
                  CSS
                </Button>
              </Card.Body>
            </Card>
          </footer>
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
