import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from '@restart/ui/esm/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { BsSortAlphaDown, BsSortAlphaDownAlt } from 'react-icons/bs';
import { VscFilter } from 'react-icons/vsc';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { BiSearch } from 'react-icons/bi';
import Pagination from '../../../../components/Pagination';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import CategoryApi from '../../../../api/Category';
import style from './index.module.scss';

function CategoryList() {
  const queryParams = new URLSearchParams(window.location.search);
  const pageNum = queryParams.get('page');
  const sortVal = queryParams.get('sortBy');
  const filterVal = queryParams.get('filter');
  const searchVal = queryParams.get('search');

  const history = useHistory();

  const [categories, setCategories] = useState(null);
  const [page, setPage] = useState(pageNum ? parseInt(pageNum) : 1);
  const [perPage, setPerPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [sortBy, setSortBy] = useState(sortVal ? sortVal : 'asc');
  const [filter, setFilter] = useState(filterVal ? filterVal : '');
  const [search, setSearch] = useState(searchVal ? searchVal : '');
  const [searchStatus, setSearchStatus] = useState(false);

  const sortOptions = ['asc', 'desc'];

  useEffect(() => {
    setCategories(null);

    history.push(
      `?page=${page}&sortBy=${sortBy}&filter=${filter}&search=${search}`
    );

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
  }, [page, sortBy, filter, searchStatus]);

  const onSearchSubmit = (e) => {
    e.preventDefault();

    setPage(1);
    setSearchStatus(!searchStatus);
  };

  const onPageChange = (selected) => {
    setPage(selected + 1);

    history.push(
      `?page=${selected + 1}&sortBy=${sortBy}&filter=${filter}&search=${search}`
    );
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
                <p id={style.subTitle}>
                  View Available SubCategories:
                  {category.subcategories_count}
                </p>
              </Link>
            ) : (
              <Link to={`/categories/${category.id}/quizzes`}>
                <p id={style.subTitle}>Check Available Quizzes</p>
              </Link>
            )}
          </Card.Body>
        </Card>
      );
    });
  };

  const renderSort = (sortPos) => {
    if (sortPos === 'asc') {
      return (
        <div className="d-flex">
          Ascending
          <BsSortAlphaDown size="20px" />
        </div>
      );
    } else {
      return (
        <div className="d-flex">
          Descending
          <BsSortAlphaDownAlt size="20px" />
        </div>
      );
    }
  };

  return (
    <div className={style.container}>
      <section className={style.headerSection}>
        <p className={style.title}>Categories</p>
        <Breadcrumbs
          chosenCategoryPathID={null}
          setChosenCategoryPathID={() => {}}
        />
      </section>
      <div className={style.categoryConditionsStyle}>
        <Form className="d-flex" onSubmit={onSearchSubmit}>
          <FormControl
            type="search"
            placeholder="Search"
            className={style.searchBar}
            aria-label="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);

              if (e.target.value.length === 0) {
                setPage(1);
                setSearchStatus(!searchStatus);
              }
            }}
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
            <span className={style.dropdownText}> {renderSort(sortBy)} </span>
            <RiArrowDropDownLine size="20px" />
          </Dropdown.Toggle>
          <Dropdown.Menu className={style.dropdownMenu}>
            {sortOptions.map((option, key) => {
              return (
                <Dropdown.Item
                  key={key}
                  className={
                    sortBy === option
                      ? `${style.dropdownItemStyle} ${style.dropdownFocus}`
                      : style.dropdownItemStyle
                  }
                  onClick={() => {
                    setPage(1);
                    setSortBy(option);
                  }}
                >
                  {renderSort(option)}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle
            className={style.dropdownStyle}
            variant="link"
            bsPrefix="none"
          >
            <span className={style.dropdownText}>
              {filter === '' ? 'Filter' : filter}
            </span>
            <VscFilter size="20px" />
          </Dropdown.Toggle>
          <Dropdown.Menu className={style.Dropdownmenustyle}>
            <Dropdown.Item
              className={
                filter === ''
                  ? `${style.dropdownItemStyle} ${style.dropdownFocus}`
                  : style.dropdownItemStyle
              }
              onClick={() => {
                setFilter('');
                setPage(1);
              }}
            >
              All
            </Dropdown.Item>
            <Dropdown.Item
              className={
                filter === 'Taken'
                  ? `${style.dropdownItemStyle} ${style.dropdownFocus}`
                  : style.dropdownItemStyle
              }
              onClick={() => {
                setFilter('Taken');
                setPage(1);
              }}
            >
              Taken
            </Dropdown.Item>
            <Dropdown.Item
              className={
                filter === 'Not Taken'
                  ? `${style.dropdownItemStyle} ${style.dropdownFocus}`
                  : style.dropdownItemStyle
              }
              onClick={() => {
                setFilter('Not Taken');
                setPage(1);
              }}
            >
              Not Taken
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {categories === null ? (
        <div className={style.loading}>
          <Spinner animation="border" role="status"></Spinner>
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
        <div className="pt-4">
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
