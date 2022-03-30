import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useToast } from '../../../../hooks/useToast';
import Card from 'react-bootstrap/Card';
import DataTable from '../../../../components/DataTable';
import SearchBar from '../../../../components/SearchBar';
import Pagination from '../../../../components/Pagination';
import Button from '../../../../components/Button';
import CategoryApi from '../../../../api/Category';
import style from './index.module.scss';
import ConfirmationModal from '../../../../components/ConfirmationModal';

const CategoryList = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const pageNum = queryParams.get('page');
  const searchVal = queryParams.get('search');
  const sortBy = queryParams.get('sortBy') || '';
  const sortDirection = queryParams.get('sortDirection') || '';

  const history = useHistory();
  const toast = useToast();

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [page, setPage] = useState(pageNum ? parseInt(pageNum) : 1);
  const [search, setSearch] = useState(searchVal ? searchVal : '');
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({});
  const [categories, setCategories] = useState(null);
  const [changeList, setChangeList] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [perPage, setPerPage] = useState(0);

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
    history.push(
      `?page=${page}&search=${search}&sortBy=${sortOptions.sortBy}&sortDirection=${sortOptions.sortDirection}`
    );

    load();
  }, [changeList]);

  useEffect(() => {
    if (search || sortOptions.sortBy) {
      setPage(1);
      setChangeList(!changeList);
    }
  }, [search, sortOptions]);

  const load = () => {
    setCategories(null);

    CategoryApi.listOfCategories({
      page: page,
      search,
      sortBy: sortOptions.sortBy,
      sortDirection: sortOptions.sortDirection,
      listCondition: 'paginated'
    }).then(({ data }) => {
      setCategories(data.data);
      setPerPage(data.per_page);
      setTotalItems(data.total);
      setLastPage(data.last_page);
    });
  };
 
  useEffect(() => {
    if (deleteConfirmed) {
      toast('Processing', `Deleting ${itemToDelete.name}...`);

      CategoryApi.deleteCategory(itemToDelete.id)
        .then(({ data }) => {
          toast('Success', data.message);
          setDeleteConfirmed(false);

          if (categories?.length === 1 && page != 1) {
            setPage(page - 1);
            setChangeList(!changeList);
          } else {
            load();
          }
        })
        .catch(() =>
          toast(
            'Error',
            'There was an error encountered while deleting the category.'
          )
        );
    }
  }, [deleteConfirmed]);

  const onPageChange = (selected) => {
    setPage(selected + 1);
    setChangeList(!changeList);
  };

  const onCategoryChecker = (category) => {
    if (category.subcategories_count <= 0) {
      setCanDelete(true);
    } else {
      setCanDelete(false);
    }
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
              <Button
                buttonLabel="Delete"
                buttonSize="sm"
                outline={true}
                onClick={() => {
                  onCategoryChecker(category);
                  setItemToDelete(category);
                  setShowConfirmationModal(true);
                }}
              />
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
      <ConfirmationModal
        showModal={showConfirmationModal}
        setShowModal={setShowConfirmationModal}
        itemToDelete={itemToDelete.name}
        setDeleteConfirmed={setDeleteConfirmed}
        canDelete={canDelete}
      />
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
