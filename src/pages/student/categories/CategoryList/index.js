import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from '@restart/ui/esm/Button';
import { BiSearch } from 'react-icons/bi';
import style from './index.module.css';
import Pagination from '../../../../components/Pagination';

import CategoryApi from '../../../../api/Category';

function CategoryList() {
  const [categories, setCategories] = useState(null);
  const queryParams = new URLSearchParams(window.location.search);
  const pageNum = queryParams.get('page');
  const searchVal = queryParams.get('search');
  const history = useHistory();

  const [page, setPage] = useState(pageNum ? parseInt(pageNum) : 1);
  const [perPage, setPerPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [lastPage, setLastPage] = useState(0);

  const [search, setSearch] = useState(searchVal ? searchVal : '');
  const [searchStatus, setSearchStatus] = useState(false);

  useEffect(() => {
    history.push(`?page=${page}&search=${search}`);

    CategoryApi.getAll({ page: page, search: search }).then(({ data }) => {
      setCategories(data.data);
      setPerPage(data.per_page);
      setTotalItems(data.total);
      setLastPage(data.last_page);
    });
  }, [page, searchStatus]);

  const onSearchSubmit = (e) => {
    e.preventDefault();

    setPage(1);
    setSearchStatus(!searchStatus);
  };

  const onPageChange = (selected) => {
    setPage(selected + 1);

    history.push(`?page=${selected + 1}&search=${search}`);
  };

  const renderCatList = () => {
    return categories.map((category, idx) => {
      return (
        <Card className={style.card} key={idx}>
          <Card.Header id={style.cardHeader}>
            <p className={style.cardTitle}>{category.name}</p>
            <p className={style.cardSubtitle}>{category.description}</p>
          </Card.Header>
          <Card.Body>
            {category.subcategories_count ? (
              <Link to={`/categories/${category.id}/sub`}>
                <div>
                  {' '}
                  <Card.Title>
                    <p id={style.Subtitle}>
                      View Available SubCategories:{' '}
                      {category.subcategories_count}
                    </p>
                  </Card.Title>{' '}
                </div>
              </Link>
            ) : (
              <Link to={`/categories/${category.id}/quizzes`}>
                <div>
                  {' '}
                  <Card.Title>
                    <p id={style.Subtitle}>Check Available Quizzes</p>
                  </Card.Title>{' '}
                </div>
              </Link>
            )}
          </Card.Body>
        </Card>
      );
    });
  };

  return (
    <div style={{ padding: '0px 196px', color: '#48535B' }}>
      <p className={style.title}>Categories</p>
      <Form className='d-flex' onSubmit={onSearchSubmit}>
        <FormControl
          type='search'
          placeholder='Search'
          className={style.searchBar}
          aria-label='Search'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);

            if (e.target.value.length === 0) {
              setPage(1);
              setSearchStatus(!searchStatus);
            }
          }}
        />
        <Button type='submit' className={style.searchButton}>
          <BiSearch className={style.searchIcon} />
        </Button>
      </Form>
      {categories === null ? (
        <div className={style.loading}>
          <Spinner animation='border' role='status'></Spinner>
          <span className={style.loadingWord}>Loading</span>
        </div>
      ) : categories?.length > 0 ? (
        <div className={style.cardList}>{renderCatList()}</div>
      ) : (
        ''
      )}

      {categories?.length <= 0 ? (
        <div className={style.noResultsMessage}>
          <p className={style.message}>NO RESULTS FOUND</p>
        </div>
      ) : (
        <div className='pt-4'>
          <Pagination
            page={page}
            perPage={perPage}
            totalItems={totalItems}
            pageCount={lastPage}
            onPageChange={onPageChange}
          ></Pagination>
        </div>
      )}
    </div>
  );
}

export default CategoryList;
