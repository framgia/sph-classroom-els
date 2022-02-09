import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Col, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import Pagination from '../../../../components/Pagination';
import style from './index.module.scss';
import LearningApi from '../../../../api/Learning';
import CategoryLearned from './component';

const LearningList = () => {
  const [learnings, setLearnings] = useState(null);
  const queryParams = new URLSearchParams(window.location.search);
  const pageNum = queryParams.get('page');

  const history = useHistory  ();

  const [page, setPage] = useState(pageNum ? parseInt(pageNum) : 1);
  const [perPage, setPerPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    history.push(
      `?page=${page}`
    );

    LearningApi.getAll({
      page: page
    }).then(({ data }) => {
      setLearnings(data.data);
      setPerPage(data.per_page);
      setTotalItems(data.total);
      setLastPage(data.last_page);
    });

  }, [page]);

  const onPageChange = (selected) => {
    setPage(selected + 1);

    history.push(
      `?page=${page}`
    );
  };

  return (
    <Col>
      <div className={style.stylePosition}>
        <Card>
          <Card.Header className={style.forContainerBar2}>
            <Table style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <td className={style.tbleData}>Quizzes Learned</td>
                  <td className={style.tbleData}>Score</td>
                  <td className={style.tbleData}>Categories</td>
                  <td className={style.tbleData}>Description</td>
                </tr>
              </tbody>
            </Table>
          </Card.Header>
          <Card.Body className={style.cardBody}>
            <div className={style.tableScrol}>
              <Table style={{ width: '100%' }}>
                <tbody>
                  {learnings?.length > 0 ?
                    learnings?.map((learning, idx) => { 
                      return (
                        <CategoryLearned learning={learning} key={idx}/>
                      ); 
                    }) : 
                    <div>
                      <center>
                        <span>No Quizzes Learned</span>
                      </center>
                    </div>
                  }
                </tbody>
              </Table>
            </div>
            <Pagination
              page={page}
              perPage={perPage}
              totalItems={totalItems}
              pageCount={lastPage}
              onPageChange={onPageChange}
            ></Pagination>
          </Card.Body>
        </Card>
      </div>
    </Col>
  );
};

export default LearningList;
