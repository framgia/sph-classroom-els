import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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
import Pagination from '../../../../components/Pagination';

import style from './index.module.scss';

import CategoryApi from '../../../../api/Category';

const CategoryList = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const pageNum = queryParams.get('page');

  //TEMPORARY VALUES since the search, sort, and filter functionality isn't implemented yet.
  const sortBy = 'asc';
  const filter = '';
  const search = '';

  const history = useHistory();

  const [categories, setCategories] = useState(null);
  const [page, setPage] = useState(pageNum ? parseInt(pageNum) : 1);
  const [perPage, setPerPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    history.push(`?page=${page}`);

    CategoryApi.getAll({
      page: page,
      sortBy: sortBy,
      filter: filter,
      search: search
    }).then(({ data }) => {
      setCategories(data.data);
      setPerPage(data.per_page);
      setTotalItems(data.total);
      setLastPage(data.last_page);
    });
  }, [page]);

  const onPageChange = (selected) => {
    setPage(selected + 1);

    history.push(`?page=${selected + 1}`);
  };

  const renderList = () => {
    return categories?.map((category, idx) => {
      return (
        <tr key={idx}>
          <td id={style.tBodyStyle}>{category.id}</td>
          <td id={style.tBodyStyle}>{category.name}</td>
          <td id={style.tBodyStyle} className={`${style.paragraphEllipsis}`}>
            {category.description}
          </td>
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
        <p className={style.title}>Categories</p>
        <Col>
          <Card className={style.navMaincard}>
            <Card.Header className={style.navContainer}>
              <div className={style.categoryConditionsStyle}>
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

                <Dropdown>
                  <Dropdown.Toggle
                    className={style.dropdownStyle}
                    variant="link"
                    bsPrefix="none"
                  >
                    <span className={style.dropdownText}>Filter</span>
                    <VscFilter size="20px" />
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
              <Button className={style.button}>Add Category</Button>
              <div>
                <Table className={style.formatTable}>
                  <thead>
                    <tr>
                      <td className={style.firstCol}>ID</td>
                      <td className={style.firstCol}>Name</td>
                      <td className={style.firstCol}>Description</td>
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
          <div id={style.paginateStyle}>
            <Pagination
              page={page}
              perPage={perPage}
              totalItems={totalItems}
              pageCount={lastPage}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
