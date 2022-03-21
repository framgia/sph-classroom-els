import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useToast } from '../../../../hooks/useToast';
import Card from 'react-bootstrap/Card';
import FilterDropdown from '../../../../components/FilterDropdown';
import DataTable from '../../../../components/DataTable';
import SearchBar from '../../../../components/SearchBar';
import Pagination from '../../../../components/Pagination';
import Button from '../../../../components/Button';
import CategoryApi from '../../../../api/Category';
import style from './index.module.scss';

const CategoryList = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const pageNum = queryParams.get('page');
  const searchVal = queryParams.get('search');
  const sortBy = queryParams.get('sortBy') || '';
  const sortDirection = queryParams.get('sortDirection') || '';

  const history = useHistory();
  const toast = useToast();

  const [categories, setCategories] = useState(null);
  const [search, setSearch] = useState(searchVal ? searchVal : '');
  const [page, setPage] = useState(pageNum ? parseInt(pageNum) : 1);
  const [perPage, setPerPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [sortOptions, setSortOptions] = useState({
    sortBy,
    sortDirection
  });

  const tableHeaderNames = [
    { title: 'ID', canSort: true },
    { title: 'Action', canSort: false },
    { title: 'Name', canSort: true },
    { title: 'Description', canSort: false }
  ];

  useEffect(() => {
    setCategories(null);

    history.push(
      `?page=${page}&search=${search}&sortBy=${sortOptions.sortBy}&sortDirection=${sortOptions.sortDirection}`
    );

    CategoryApi.listOfCategories({
      page: page,
      search,
      sortBy: sortOptions.sortBy,
      sortDirection: sortOptions.sortDirection,
      listCondition: 'paginated'
    })
      .then(({ data }) => {
        setCategories(data.data);
        setPerPage(data.per_page);
        setTotalItems(data.total);
        setLastPage(data.last_page);
      })
      .catch(() =>
        toast('Error', 'There was an error getting the list of categories.')
      );
  }, [page, search, sortOptions]);

  const onPageChange = (selected) => {
    setPage(selected + 1);
  };

  const renderTableData = () => {
    return categories?.map((category, idx) => {
      return (
        <tr key={idx}>
          <td id={style.tableData}>{category.id}</td>
          <td id={style.actionButtonsColumn}>
            <td>
              <Link to={`/admin/edit-category/${category.id}`}>
                <Button buttonLabel="Edit" buttonSize="sm" />
              </Link>
            </td>
            <td>
              <Button buttonLabel="Delete" buttonSize="sm" outline={true} />
            </td>
          </td>
          <td id={style.tableData}>{category.name}</td>
          <td id={style.tableData} className={`${style.paragraphEllipsis}`}>
            {category.description}
          </td>
        </tr>
      );
    });
  };

  return (
    <div className={style.cardContainer}>
      <div>
        <div className={style.header}>
          <p className={style.title}>Categories</p>
          <Link to="/admin/add-category" className={style.addButton}>
            <Button buttonLabel="Add Category" buttonSize="def" />
          </Link>
        </div>
        <Card className={style.mainCard}>
          <Card.Header className={style.cardHeader}>
            <SearchBar
              placeholder="Search by Category name"
              search={search}
              setSearch={setSearch}
            />
            <FilterDropdown dropdownLabel="Filter" />
          </Card.Header>
          <Card.Body className={style.cardBodyScroll}>
            <div>
              <DataTable
                tableHeaderNames={tableHeaderNames}
                renderTableData={renderTableData}
                titleHeaderStyle={style.tableHeader}
                sortOptions={sortOptions}
                setSortOptions={setSortOptions}
                data={categories}
              />
            </div>
          </Card.Body>
        </Card>
        <div className="pt-4">
          <div id={style.pagination}>
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
