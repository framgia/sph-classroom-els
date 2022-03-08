import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { BiSearch } from 'react-icons/bi';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import Pagination from '../../../../components/Pagination';
import { VscFilter } from 'react-icons/vsc';

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
  const search = '';

  const history = useHistory();

  const [page, setPage] = useState(pageNum ? parseInt(pageNum) : 1);
  const [perPage, setPerPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [lastPage, setLastPage] = useState(0);

  const [sortOptions, setSortOptions] = useState({
    sortBy,
    sortDirection,
  });

  useEffect(() => {
    setCategories(null);

    history.push(
      `?page=${page}&sortBy=${sortOptions.sortBy}&sortDirection=${sortOptions.sortDirection}`
    );

    CategoryApi.listOfCategories({
      page: page,
      search: search,
      sortBy: sortOptions.sortBy,
      sortDirection: sortOptions.sortDirection,
    }).then(({ data }) => {
      setCategories(data.data);
      setPerPage(data.per_page);
      setTotalItems(data.total);
      setLastPage(data.last_page);
    });
  }, [page, sortOptions]);

  const onPageChange = (selected) => {
    setPage(selected + 1);
  };

  const tableHeaderNames = [
    { title: 'ID', canSort: true },
    { title: 'Name', canSort: true },
    { title: 'Description', canSort: false },
    { title: 'Edit', canSort: false },
  ];

  const renderTableData = () => {
    return categories?.map((category, idx) => {
      return (
        <tr key={idx}>
          <td id={style.tBodyStyle}>{category.id}</td>
          <td id={style.tBodyStyle}>{category.name}</td>
          <td id={style.tBodyStyle} className={`${style.paragraphEllipsis}`}>
            {category.description}
          </td>
          <td id={style.tBodyStyle1}>
            <Link to={`/admin/edit-category/${category.id}`}>
              <FaRegEdit size="20px" color="black" />
            </Link>
          </td>
          <td id={style.tBodyStyle1}>
            <RiDeleteBin2Fill size="30px" color="#db7771" />
          </td>
        </tr>
      );
    });
  };

  return (
    <div className={style.cardContainer}>
      <div>
        <div className={style.headerTitle}>
          <p className={style.title}>Categories</p>
        </div>
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
              <Dropdown.Toggle className={style.dropdownButton} bsPrefix="none">
                Filter
                <VscFilter size={17} />
              </Dropdown.Toggle>
            </Dropdown>
          </Card.Header>
          <Card.Body className={style.cardBodyScroll}>
            <Link to="/admin/add-category">
              <Button className={style.addButton}>Add Category</Button>
            </Link>
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
