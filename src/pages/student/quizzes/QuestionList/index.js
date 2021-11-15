import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { SiHtml5 } from 'react-icons/si';
import style from './index.module.css';

const QuestionList = () => {

  return (
    <div id={style.center}>
      <Container>
        <Button href="/categories/:id/quizzes" id={style.backbutton}>BACK</Button>
        <Card>
          <Card.Header id={style.topicbg} className={style.cardheader}>
            <div >
              <h2 className={style.topic}><b>Topic:</b> Web Development</h2>
            </div>
          </Card.Header>
          <Card.Body className={style.wholebodycard}>
            <div className={style.headerquiz}> <SiHtml5 /> HTML </div>
            <div align="center" id={style.overview}>
              <p>This quiz consist of 10 items</p>
              <hr />
              <p> Overall Time: 5:00 minutes</p>
            </div>
            <hr className={style.hbreakbottom} />
            <div className={style.bottombodycard}>
              <Button href="/categories/:id/quizzes/:id/questions/:id/answer" id={style.button} className={style.startbutton}>Start Quiz</Button>
            </div>
          </Card.Body>
        </Card>
      </Container>

    </div>
  );
};

export default QuestionList;