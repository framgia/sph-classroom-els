import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import Pagination from '../../../../components/Pagination';

import QuestionGrid from './components/QuestionGrid';
import style from './index.module.css';

import QuizApi from '../../../../api/Quiz'

const QuizList = () => {
  const categoryId = useParams().id;
  console.log(categoryId)
  const category = {
    title: 'Encapsulation'
  };

  const perPage = 9;
  const [page, setPage] = useState(1)
  const [quizzes, setQuizzes] = useState(null)
  let params = useParams()

  useEffect(() => {
    QuizApi.getAll(categoryId)
      .then(({ data }) => {
        setQuizzes(data.data)
        console.log(data)
      }).catch(error => {
        console.log(error);
      });



  }, [])

  return (
    <Container className={style.container}>
      <Button className={style.backButton}>Back</Button>
      <p className={style.title}>{category?.title}</p>
      {quizzes === null ? <div className={style.loading}>
        <Spinner animation="border" role="status"></Spinner>
        <span className={style.loadingWord}>Loading</span>
      </div>
        : ''}
      <Row xs={1} sm={2} md={3} lg={3}>
        {quizzes && quizzes.map((quiz, index) => {
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
            totalItems: quizzes ? quizzes.length : 0,
            pageCount: 2,
            onPageChange: () => { },
          }}
        ></Pagination>
      </div>
    </Container>
  );
};

export default QuizList;