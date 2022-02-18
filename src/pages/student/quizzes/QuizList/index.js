import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Col, Spinner } from 'react-bootstrap';
import Pagination from '../../../../components/Pagination';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';

import QuestionGrid from './components/QuestionGrid';
import style from './index.module.css';

import QuizApi from '../../../../api/Quiz';
import CategoryApi from '../../../../api/Category';

const QuizList = () => {
  const categoryId = useParams().id;
  const queryParams = new URLSearchParams(window.location.search);
  const pageNum = queryParams.get('page');
  const history = useHistory();

  const [page, setPage] = useState(pageNum ? pageNum : 1);
  const [quizzes, setQuizzes] = useState(null);
  const [perPage, setPerPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    QuizApi.getAll(categoryId, page)
      .then(({ data }) => {
        setQuizzes(data.data);
        setPerPage(data.per_page);
        setTotalItems(data.total);
        setLastPage(data.last_page);
      })
      .catch((error) => {
        console.log(error);
      });

    CategoryApi.show({ categoryId }).then(({ data }) => {
      setCategory(data.data);
    });
  }, [page]);

  const onPageChange = (selected) => {
    setPage(selected + 1);

    history.push(`/categories/${categoryId}/quizzes?page=${selected + 1}`);
  };

  return (
    <div className={style.container}>
      <a href={`/categories/${category?.category_id}/sub`}>
        <BsFillArrowLeftSquareFill className={style.backarrow} />
        <p className={style.title}>{category?.name}</p>
      </a>
      {quizzes === null ? (
        <div className={style.loading}>
          <Spinner animation="border" role="status"></Spinner>
          <span className={style.loadingWord}>Loading</span>
        </div>
      ) : (
        ''
      )}
      <div>
        {quizzes && quizzes.length > 0 && (
          <div id={style.GridCard}>
            {/* <Row xs={1} sm={2} md={3} lg={3}> */}
            {quizzes.map((quiz, index) => {
              return (
                <Col key={index}>
                  <a
                    href={`/categories/${categoryId}/quizzes/${quiz.id}/questions`}
                  >
                    <QuestionGrid quiz={quiz}></QuestionGrid>
                  </a>
                </Col>
              );
            })}
            {/* </Row> */}
          </div>
        )}
      </div>

      {quizzes?.length <= 0 ? (
        <div className={style.noResultsMessage}>
          <p className={style.message}>NO RESULTS FOUND</p>
        </div>
      ) : (
        <div className="pt-4">
          <Pagination
            page={page}
            perPage={perPage}
            totalItems={totalItems}
            pageCount={lastPage}
            onPageChange={onPageChange}
          ></Pagination>
        </div>
      )}
    </div>
  );
};

export default QuizList;
