import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Pagination from '../../../../components/Pagination';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import CategoryApi from '../../../../api/Category';
import style from './index.module.scss';
import SearchBar from '../../../../components/SearchBar';
import FilterDropdown from '../../../../components/FilterDropdown';

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
  const [sortByText, setSortByText] = useState(sortVal ? sortVal : '');
  const [sortBy, setSortBy] = useState(sortVal ? sortVal : 'Ascending');
  const [filter, setFilter] = useState(filterVal ? filterVal : '');
  const [search, setSearch] = useState(searchVal ? searchVal : '');

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
  }, [page, sortBy, filter, search]);

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

  const dropdownOptions = [
    { name: 'Ascending' },
    { name: 'Descending' },
  ];

  useEffect(() => {
    if (sortBy) {
      if (sortBy === 'Ascending') {
        setSortBy('asc');
        setSortByText('Ascending');
      } else if (sortBy === 'Descending') {
        setSortBy('desc');
        setSortByText('Descending');
      }
    }
  }, [sortBy]);

  const filterTaken = [
    { name: 'Taken' },
    { name: 'Not Taken' },
  ];

  return (
    <div className="container">
      <section className={style.headerSection}>
        <p className={style.title}>Categories</p>
        <Breadcrumbs />
      </section>
      <div className={style.categoryConditionsStyle}>
        <SearchBar
          placeholder="Search"
          search={search}
          setSearch={setSearch}
        />

        <FilterDropdown
          dropdownItems={dropdownOptions}
          filter={sortByText}
          setFilter={setSortBy}
        />

        <FilterDropdown
          dropdownLabel="Filter"
          dropdownItems={filterTaken}
          filter={filter}
          setFilter={setFilter}
        />
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
