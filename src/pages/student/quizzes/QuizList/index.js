import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import Pagination from '../../../../components/Pagination';

import QuestionGrid from './components/QuestionGrid';
import style from './index.module.css';

import QuizApi from '../../../../api/Quiz';

const QuizList = () => {
  const categoryId = useParams().id;
  const queryParams = new URLSearchParams(window.location.search); 
  const pageNum = queryParams.get('page');

  const category = {
    title: 'Encapsulation'
  };

  const [page, setPage] = useState(pageNum ? pageNum : 1);
  const [quizzes, setQuizzes] = useState(null);
  const [perPage, setPerPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    QuizApi.getAll(categoryId, page)
      .then(({ data }) => {
        console.log(data);
        setQuizzes(data.data);
        setPerPage(data.per_page);
        setTotalItems(data.total);
      }).catch(error => {
        console.log(error);
      });
  }, [page]);

  const onPageChange = (selected) => {
    setPage(selected + 1);
  
    window.location = `/categories/${categoryId}/quizzes?page=${selected + 1}`;
  };

  console.log(Math.ceil(totalItems / perPage));

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

      {quizzes?.length <= 0 ? 
        <div className={style.noResultsMessage}>
          <p className={style.message}>NO RESULTS FOUND</p>
        </div> : ''}
 
      <div className="pt-4">
        <Pagination
          page = {page}
          perPage = {perPage}
          totalItems = {totalItems}
          pageCount = {totalItems ? Math.ceil(totalItems / perPage) : 0}
          onPageChange = {onPageChange}
        ></Pagination>
      </div>
    </Container>
  );
};

export default QuizList;