import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useToast } from '../../../../hooks/useToast';
import Card from 'react-bootstrap/Card';
import Pagination from '../../../../components/Pagination';
import DataTable from '../../../../components/DataTable';
import LearningApi from '../../../../api/Learning';
import style from './index.module.scss';

const LearningList = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const pageNum = queryParams.get('page');
  const sortBy = queryParams.get('sortBy') || '';
  const sortDirection = queryParams.get('sortDirection') || '';
  const history = useHistory();
  const toast = useToast();

  const [learnings, setLearnings] = useState(null);
  const [changeList, setChangeList] = useState(false);
  const [page, setPage] = useState(pageNum ? parseInt(pageNum) : 1);
  const [perPage, setPerPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [sortOptions, setSortOptions] = useState({
    sortBy,
    sortDirection
  });

  const tableHeaderNames = [
    { title: 'Quizzes Learned', canSort: true },
    { title: 'Current Score', canSort: false },
    { title: 'Categories', canSort: true },
    { title: 'Description', canSort: false }
  ];

  useEffect(() => {
    history.push(
      `?page=${page}&sortBy=${sortOptions.sortBy}&sortDirection=${sortOptions.sortDirection}`
    );

    setLearnings(null);

    LearningApi.getAll({
      page,
      sortBy: sortOptions.sortBy,
      sortDirection: sortOptions.sortDirection
    })
      .then(({ data }) => {
        setLearnings(data.data);
        setPerPage(data.per_page);
        setTotalItems(data.total);
        setLastPage(data.last_page);
      })
      .catch(() =>
        toast('Error', 'There was an error getting the list of learnings.')
      );
  }, [changeList]);

  useEffect(() => {
    if (sortOptions.sortBy) {
      setPage(1);
      setChangeList(!changeList);
    }
  }, [sortOptions]);

  const onPageChange = (selected) => {
    setPage(selected + 1);
    setChangeList(!changeList);
  };

  const renderTableData = () => {
    return learnings?.map((learning, idx) => {
      return (
        <tr key={idx} className={style.tableDataRow}>
          <td className={style.tableData}>{learning.title}</td>
          <td className={style.tableData}>
            {learning.score}/{learning.questions.length}
          </td>
          <td className={style.tableData}>{learning.name}</td>
          <td className={style.tableData}>{learning.description}</td>
        </tr>
      );
    });
  };

  return (
    <div className="container">
      <h1 className={style.pageTitle}>Learnings</h1>
      <Card>
        <Card.Header className={style.cardHeader}></Card.Header>
        <Card.Body className={style.cardBody}>
          <DataTable
            tableHeaderNames={tableHeaderNames}
            renderTableData={renderTableData}
            titleHeaderStyle={style.tableHeader}
            sortOptions={sortOptions}
            setSortOptions={setSortOptions}
            data={learnings}
          />
        </Card.Body>
      </Card>
      <section>
        <div className={style.pagination}>
          <Pagination
            page={page}
            perPage={perPage}
            totalItems={totalItems}
            pageCount={lastPage}
            onPageChange={onPageChange}
          />
        </div>
      </section>
    </div>
  );
};

export default LearningList;
