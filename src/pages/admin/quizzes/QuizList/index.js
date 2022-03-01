import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from '@restart/ui/esm/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { VscFilter } from 'react-icons/vsc';
import { BiSearch } from 'react-icons/bi';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { BsSortAlphaDown } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useToast } from '../../../../hooks/useToast';

import Pagination from '../../../../components/Pagination';
import style from './index.module.scss';
import QuizApi from '../../../../api/Quiz';
import AddQuizModal from './components/AddQuizModal';
import DataTable from '../../../../components/DataTable';

const QuizList = () => {
  const [adminquiz, setAdminquiz] = useState(null);
  const queryParams = new URLSearchParams(window.location.search);
  const pageNum = queryParams.get('page');
  const [modalShow, setModalShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(false);
  const TYPE = 'withoutPathDisplay';

  const history = useHistory();
  const toast = useToast();

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
    QuizApi.adminQuiz({
      page: page
    }).then(({ data }) => {
      setAdminquiz(data.data);
      setPerPage(data.per_page);
      setTotalItems(data.total);
      setLastPage(data.last_page);
    });
  };

  useEffect(() => {
    history.push(`?page=${page}`);

    load();
  }, [page]);

  const onPageChange = (selected) => {
    setPage(selected + 1);

    history.push(`?page=${page}`);
  };

  const tableHeaderNames = [
    { title: 'ID' },
    { title: 'Category' },
    { title: 'Name' },
    { title: 'Edit' }
  ];

  const renderTableData = () => {
    return adminquiz?.map((quiz, idx) => {
      return (
        <tr key={idx}>
          <td id={style.classColumn}>{quiz.id}</td>
          <td id={style.classColumn}>{quiz.name}</td>
          <td id={style.classColumn}>{quiz.title}</td>
          <td id={style.buttonColumn}>
            <Link to={`/admin/quizzes/${quiz.id}`}>
              <FaRegEdit size="20px" color="black"/>
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

                <Dropdown style={{ margin: '0px 0px 0px 683px' }}>
                  <Dropdown.Toggle
                    className={style.dropdownStyle}
                    variant="link"
                    bsPrefix="none"
                  >
                    <span className={style.dropdownText}>Filter</span>
                    <VscFilter size="20px" />
                  </Dropdown.Toggle>
                </Dropdown>
                <Dropdown>
                  <Dropdown.Toggle
                    className={style.dropdownStyle}
                    variant="link"
                    bsPrefix="none"
                  >
                    <span className={style.dropdownText}>Sort</span>
                    <BsSortAlphaDown size="20px" />
                  </Dropdown.Toggle>
                </Dropdown>
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
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
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
