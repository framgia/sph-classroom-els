import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Col, Table } from 'react-bootstrap';
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

import Pagination from '../../../../components/Pagination';
import style from './index.module.scss';
import QuizApi from '../../../../api/Quiz';

const QuizList = () => {
  const [adminquiz, setAdminquiz] = useState(null);
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

    QuizApi.adminQuiz({
      page: page
    }).then(({ data }) => {
      setAdminquiz(data.data);
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

  const renderList = () => {
    return adminquiz?.map((quiz, idx) => {
      return (
        <tr key={idx}>
          <td id={style.classColumn}>{quiz.id}</td>
          <td id={style.classColumn}>{quiz.name}</td>
          <td id={style.classColumn}>{quiz.title}</td>
          <td id={style.buttonColumn}>
            <Button className={style.designButton}>
              <FaRegEdit size="20px" />
            </Button>
          </td>
          <td id={style.buttonColumn}>
            <Button className={style.designButton}>
              <RiDeleteBin2Fill size="30px" color="#db7771" />
            </Button>
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
              <Button className={style.button}>Add a Quiz</Button>
              <div>
                <Table className={style.formatTable}>
                  <thead>
                    <tr>
                      <td className={style.classCol}>ID</td>
                      <td className={style.classCol}>Category</td>
                      <td className={style.classCol}>Name</td>
                      <td className={style.buttonCol}>Edit</td>
                      <td className={style.buttonCol}>Delete</td>
                    </tr>
                  </thead>
                  <tbody>{renderList()}</tbody>
                </Table>
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
      </div>
    </div>
  );
};

export default QuizList;
