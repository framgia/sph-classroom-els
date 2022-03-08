import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { BiSearch } from 'react-icons/bi';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useToast } from '../../../../hooks/useToast';
import { VscFilter } from 'react-icons/vsc';
import Dropdown from 'react-bootstrap/Dropdown';

import Pagination from '../../../../components/Pagination';
import style from './index.module.scss';
import QuizApi from '../../../../api/Quiz';
import AddQuizModal from './components/AddQuizModal';
import DataTable from '../../../../components/DataTable';

const QuizList = () => {
  const [adminQuiz, setAdminQuiz] = useState(null);
  const queryParams = new URLSearchParams(window.location.search);
  const pageNum = queryParams.get('page');
  const sortBy = queryParams.get('sortBy') || '';
  const sortDirection = queryParams.get('sortDirection') || '';
  const [modalShow, setModalShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(false);
  const TYPE = 'withoutPathDisplay';

  const history = useHistory();
  const toast = useToast();

  const [sortOptions, setSortOptions] = useState({
    sortBy,
    sortDirection,
  });

  const [page, setPage] = useState(pageNum ? parseInt(pageNum) : 1);
  const [perPage, setPerPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [lastPage, setLastPage] = useState(0);

  const [location, setLocation] = useState(null);

  const handleOnSubmit = async ({ name, instruction }) => {
    setSubmitStatus(true);

    if (location) {
      toast('Processing', 'Adding quiz...');
      setModalShow(false);
    }

    setErrors('');

    try {
      await QuizApi.addQuiz(name, instruction, location);
      history.push('/admin/quizzes');
      toast('Success', 'Successfully Added quiz.');
      setSubmitStatus(false);
      load();
    } catch (error) {
      toast('Error', 'Please choose a category.');
      setSubmitStatus(false);
    }
  };

  const load = () => {
    setAdminQuiz(null);

    QuizApi.adminQuiz({
      page: page,
      sortBy: sortOptions.sortBy,
      sortDirection: sortOptions.sortDirection,
    }).then(({ data }) => {
      setAdminQuiz(data.data);
      setPerPage(data.per_page);
      setTotalItems(data.total);
      setLastPage(data.last_page);
    });
  };

  useEffect(() => {
    history.push(
      `?page=${page}&sortBy=${sortOptions.sortBy}&sortDirection=${sortOptions.sortDirection}`
    );

    load();
  }, [page, sortOptions]);

  const onPageChange = (selected) => {
    setPage(selected + 1);
  };

  const tableHeaderNames = [
    { title: 'ID', canSort: true },
    { title: 'Category', canSort: true },
    { title: 'Name', canSort: true },
    { title: 'Edit', canSort: false },
  ];

  const renderTableData = () => {
    return adminQuiz?.map((quiz, idx) => {
      return (
        <tr key={idx}>
          <td id={style.classColumn}>{quiz.id}</td>
          <td id={style.classColumn}>{quiz.name}</td>
          <td id={style.classColumn}>{quiz.title}</td>
          <td id={style.buttonColumn}>
            <Link to={`/admin/quizzes/${quiz.id}`}>
              <FaRegEdit size="20px" color="black" />
            </Link>
          </td>
          <td id={style.buttonColumn}>
            <RiDeleteBin2Fill size="30px" color="#db7771" />
          </td>
        </tr>
      );
    });
  };

  return (
    <div className={style.cardContainer}>
      <div>
        <p className={style.title}>Quizzes</p>
        <Col>
          <Card className={style.mainCard}>
            <Card.Header className={style.cardHeader}>
              <Form className={style.searchSection}>
                <div className={style.searchInput}>
                  <Form.Control
                    className={style.searchBar}
                    type="text"
                    placeholder="Search name or email"
                  />
                  <BiSearch size={17} className={style.searchIcon} />
                </div>
                <Button className={style.searchButton} type="submit">
                  Search
                </Button>
              </Form>
              <Dropdown>
                <Dropdown.Toggle
                  className={style.dropdownButton}
                  bsPrefix="none"
                >
                  Filter
                  <VscFilter size={17} />
                </Dropdown.Toggle>
              </Dropdown>
            </Card.Header>
            <Card.Body className={style.cardBodyScroll}>
              <Button
                className={style.addButton}
                onClick={() => setModalShow(true)}
              >
                Add a Quiz
              </Button>
              <div>
                <DataTable
                  tableHeaderNames={tableHeaderNames}
                  renderTableData={renderTableData}
                  titleHeaderStyle={style.classCol}
                  sortOptions={sortOptions}
                  setSortOptions={setSortOptions}
                  data={adminQuiz}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </div>
      <div className="pt-4">
        <div id={style.paginateStyle}>
          <Pagination
            page={page}
            perPage={perPage}
            totalItems={totalItems}
            pageCount={lastPage}
            onPageChange={onPageChange}
          ></Pagination>
        </div>
        <AddQuizModal
          handleOnSubmit={handleOnSubmit}
          submitStatus={submitStatus}
          modalShow={modalShow}
          setModalShow={setModalShow}
          errors={errors}
          location={location}
          setLocation={setLocation}
          type={TYPE}
        />
      </div>
    </div>
  );
};

export default QuizList;
