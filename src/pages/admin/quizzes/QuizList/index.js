import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from '@restart/ui/esm/Button';
import { BiSearch } from 'react-icons/bi';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useToast } from '../../../../hooks/useToast';
import Container from 'react-bootstrap/Container';

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
    sortDirection
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
      sortDirection: sortOptions.sortDirection
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
    { title: 'ID', canSort: true  },
    { title: 'Category', canSort: true  },
    { title: 'Name', canSort: true  },
    { title: 'Edit', canSort: false }
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
    <div className={style.Bodystyle}>
      <Container className={style.quizListContainer}>
        <div>
          <p className={style.title}>Quizzes</p>
          <Col>
            <Card className={style.navMaincard}>
              <Card.Header className={style.navContainer}>
                <div className="d-flex">
                  <div>
                    <Form className="d-flex">
                      <FormControl
                        type="search"
                        placeholder="Search"
                        className={style.searchBar}
                        aria-label="Search"
                      />
                      <Button type="submit" className={style.searchButton}>
                        <BiSearch className={style.searchIcon} />
                      </Button>
                    </Form>
                  </div>
                </div>
                <table style={{ width: '100%' }}>
                  <tbody>
                    <tr>
                      <td className={style.titleText}></td>
                      <td style={{ textAlign: 'right' }}></td>
                    </tr>
                  </tbody>
                </table>
              </Card.Header>
              <Card.Body className={style.cardBodyScroll}>
                <Button
                  className={style.button}
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
      </Container>
    </div>
  );
};

export default QuizList;
