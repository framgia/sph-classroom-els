import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from '@restart/ui/esm/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { VscFilter } from 'react-icons/vsc';
import { BiSearch } from 'react-icons/bi';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import Pagination from '../../../../components/Pagination';
import Container from 'react-bootstrap/Container';

import style from './index.module.scss';

import CategoryApi from '../../../../api/Category';
import DataTable from '../../../../components/DataTable';

const CategoryList = () => {
  const [categories, setCategories] = useState(null);
  const queryParams = new URLSearchParams(window.location.search);
  const pageNum = queryParams.get('page');
  const sortBy = queryParams.get('sortBy') || '';
  const sortDirection = queryParams.get('sortDirection') || '';

  //TEMPORARY VALUES since the search, sort, and filter functionality isn't implemented yet.
  // const sortBy = 'asc';
  // const filter = '';
  const search = '';

  const history = useHistory();

  const [page, setPage] = useState(pageNum ? parseInt(pageNum) : 1);
  const [perPage, setPerPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [lastPage, setLastPage] = useState(0);

  const [sortOptions, setSortOptions] = useState({
    sortBy,
    sortDirection
  });

  useEffect(() => {
    history.push(`?page=${page}&sortBy=${sortOptions.sortBy}&sortDirection=${sortOptions.sortDirection}`);

    CategoryApi.listOfCategories({
      page: page,
      search: search,
      sortBy: sortOptions.sortBy,
      sortDirection: sortOptions.sortDirection
    }).then(({ data }) => {
      setCategories(data.data);
      console.log(data.data);
      setPerPage(data.per_page);
      setTotalItems(data.total);
      setLastPage(data.last_page);
    });
  }, [page, sortOptions]);

  const onPageChange = (selected) => {
    setPage(selected + 1);

    history.push(`?page=${selected + 1}&sortBy=${sortOptions.sortBy}&sortDirection=${sortOptions.sortDirection}`);
  };

  const tableHeaderNames = [
    { title: 'ID' },
    { title: 'Actions' },
    { title: 'Name' },
    { title: 'Description' }
  ];

  const renderTableData = () => {
    return categories?.map((category, idx) => {
      return (
        <tr key={idx}>
          <td id={style.tBodyStyle}>{category.id}</td>
          <td id={style.tBodyStyle1}>
            <Link to={`/admin/edit-category/${category.id}`}>
              <FaRegEdit className={style.actionBtn} size="20px" color="black" />
            </Link>
            <RiDeleteBin2Fill className={style.actionBtn} size="30px" color="#db7771"/>
          </td>
          <td id={style.tBodyStyle}>{category.name}</td>
          <td id={style.tBodyStyle} className={`${style.paragraphEllipsis}`}>
            {category.description}
          </td>
          
        </tr>
      );
    });
  };

  return (
    <div className={style.Bodystyle}>
      <Container className={style.categoryListContainer}>
        <div>
          <div className={style.headerTitle}>
            <p className={style.title}>Categories</p>
            <Link to="/admin/add-category">
              <Button className={style.button}>Add Category</Button>
            </Link>
          </div>
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
                <div>
                  <DataTable
                    tableHeaderNames={tableHeaderNames}
                    renderTableData={renderTableData}
                    titleHeaderStyle={style.classCol}
                    sortOptions={sortOptions}
                    setSortOptions={setSortOptions}
                    data={categories}
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
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryList;
