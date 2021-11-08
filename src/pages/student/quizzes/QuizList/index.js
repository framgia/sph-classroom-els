import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Pagination from '../../../../components/Pagination';

import QuestionGrid from './components/QuestionGrid';

import style from './index.module.css';

const QuizList = () => {
  const category = {
    title: 'Encapsulation',
    quizzes: [
      {
        title: 'JavaScript',
        answerCount: 10,
        correctAnswers: 8,
        totalQuestions: 10,
        image: '',
      },
      {
        title: 'JavaScript ES5',
        answerCount: 10,
        correctAnswers: 5,
        totalQuestions: 10,
        image: '',
      },
      {
        title: 'JavaScript ES6',
        answerCount: 0,
        correctAnswers: 0,
        totalQuestions: 10,
        image: '',
      },
      {
        title: 'JavaScript ES7',
        answerCount: 0,
        correctAnswers: 0,
        totalQuestions: 10,
        image: '',
      },
      {
        title: 'JavaScript ES8',
        answerCount: 0,
        correctAnswers: 0,
        totalQuestions: 10,
        image: '',
      },
      {
        title: 'JavaScript ES9',
        answerCount: 0,
        correctAnswers: 0,
        totalQuestions: 10,
        image: '',
      },
      {
        title: 'Basic',
        answerCount: 0,
        correctAnswers: 0,
        totalQuestions: 10,
        image: '',
      },
      {
        title: 'Advanced Javascript',
        answerCount: 0,
        correctAnswers: 0,
        totalQuestions: 10,
        image: '',
      },
      {
        title: 'CSS3',
        answerCount: 0,
        correctAnswers: 0,
        totalQuestions: 10,
        image: '',
      },
      {
        title: 'CSS3',
        answerCount: 0,
        correctAnswers: 0,
        totalQuestions: 10,
        image: '',
      },
    ],
  };
  const perPage = 9;
  const [page, setPage] = useState(1);

  return (
    <Container className={style.container}>
      <Button className={style.backButton}>Back</Button>
      <p className={style.title}>{category?.title}</p>
      <Row xs={1} sm={2} md={3} lg={3}>
        {category &&
          category?.quizzes.map((quiz, index) => {
            if (index + 1 > perPage) {
              return;
            } else {
              return (
                <Col key={index}>
                  <QuestionGrid quiz={quiz}></QuestionGrid>
                </Col>
              );
            }
          })}
      </Row>
      <div className="pt-4">
        <Pagination
          props={{
            page,
            perPage,
            totalItems: category?.quizzes.length,
            pageCount: 2,
            onPageChange: () => {},
          }}
        ></Pagination>
      </div>
    </Container>
  );
};

export default QuizList;
