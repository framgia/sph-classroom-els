import React from 'react';
import Card from 'react-bootstrap/Card';
import { Col, Table } from 'react-bootstrap';
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

const QuizList = () => {
  const quizzes = [
    {
      category: 'Web Development',
      name: 'The Basics of Web Development',
      id: '1',
    },
  ];

  const renderList = () => {
    return quizzes.map((quiz, idx) => {
      return (
        <tr key={idx}>
          <td id={style.tBodyStyle}>{quiz.id}</td>
          <td id={style.tBodyStyle}>{quiz.category}</td>
          <td id={style.tBodyStyle}>{quiz.name}</td>
          <td id={style.tBodyStyle1}>
            <Button className={style.designButton}>
              <FaRegEdit size="20px" />
            </Button>
          </td>
          <td id={style.tBodyStyle1}>
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
                      <td className={style.firstCol}>ID</td>
                      <td className={style.firstCol}>Category</td>
                      <td className={style.firstCol}>Name</td>
                      <td className={style.firstCol1}>Edit</td>
                      <td className={style.firstCol1}>Delete</td>
                    </tr>
                  </thead>
                  <tbody>{renderList()}</tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <div className="pt-4">
          <p id={style.paginateStyle}>1 - 24 of 36</p>
          <div id={style.paginateStyle}>
            <Pagination></Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizList;
