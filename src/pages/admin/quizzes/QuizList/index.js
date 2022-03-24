import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useToast } from '../../../../hooks/useToast';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from '../../../../components/Button';
import Pagination from '../../../../components/Pagination';
import DataTable from '../../../../components/DataTable';
import AddQuizModal from './components/AddQuizModal';
import SearchBar from '../../../../components/SearchBar';
import FilterDropdown from '../../../../components/FilterDropdown';
import ConfirmationModal from '../../../../components/ConfirmationModal';
import QuizApi from '../../../../api/Quiz';
import CategoryApi from '../../../../api/Category';

import style from './index.module.scss';

const QuizList = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const pageNum = queryParams.get('page');
  const searchVal = queryParams.get('search');
  const filterVal = queryParams.get('filter');
  const sortBy = queryParams.get('sortBy') || '';
  const sortDirection = queryParams.get('sortDirection') || '';

  const TYPE = 'withoutPathDisplay';
  const history = useHistory();
  const toast = useToast();

  const [adminQuiz, setAdminQuiz] = useState(null);
  const [categories, setCategories] = useState([]);
  const [showAddModal, setAddModalShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(false);
  const [location, setLocation] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({});

  const [page, setPage] = useState(pageNum ? parseInt(pageNum) : 1);
  const [perPage, setPerPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [filter, setFilter] = useState(filterVal ? filterVal : '');
  const [search, setSearch] = useState(searchVal ? searchVal : '');
  const [changeList, setChangeList] = useState(false);
  const [sortOptions, setSortOptions] = useState({
    sortBy,
    sortDirection
  });

  const tableHeaderNames = [
    { title: 'ID', canSort: true },
    { title: 'Action', canSort: false },
    { title: 'Category', canSort: true },
    { title: 'Name', canSort: true }
  ];

  const handleOnSubmit = async ({ name, instruction }) => {
    setSubmitStatus(true);

    if (location) {
      toast('Processing', 'Adding quiz...');
      setAddModalShow(false);
    }

    setErrors('');

    try {
      await QuizApi.addQuiz(name, instruction, location);
      history.push('/admin/quizzes');
      toast('Success', 'Successfully Added quiz.');
      setSubmitStatus(false);
      load();
    } catch (error) {
      toast('Error', 'Please choose a category.');
      setSubmitStatus(false);
    }
  };

  const load = () => {
    setAdminQuiz(null);

    CategoryApi.listOfCategories({
      listCondition: 'unpaginated'
    })
      .then(({ data }) => {
        setCategories(data.data);
      })
      .catch(() =>
        toast('Error', 'There was an error getting the list of categories.')
      );

    QuizApi.adminQuiz({
      page,
      filter,
      search,
      sortBy: sortOptions.sortBy,
      sortDirection: sortOptions.sortDirection
    })
      .then(({ data }) => {
        setAdminQuiz(data.data);
        setPerPage(data.per_page);
        setTotalItems(data.total);
        setLastPage(data.last_page);
      })
      .catch(() =>
        toast('Error', 'There was an error getting the list of quizzes.')
      );
  };

  useEffect(() => {
    history.push(
      `?page=${page}&search=${search}&filter=${filter}&sortBy=${sortOptions.sortBy}&sortDirection=${sortOptions.sortDirection}`
    );

    load();
  }, [changeList]);

  useEffect(() => {
    if (filter || search || sortOptions.sortBy) {
      setPage(1);
      setChangeList(!changeList);
    }
  }, [filter, search, sortOptions]);

  useEffect(() => {
    if (deleteConfirmed) {
      toast('Processing', `Deleting ${itemToDelete.title}...`);

      QuizApi.deleteQuiz(itemToDelete.id)
        .then(({ data }) => {
          toast('Success', data.message);
          setDeleteConfirmed(false);
          load();
        })
        .catch(() =>
          toast(
            'Error',
            'There was an error encountered while deleting the quiz.'
          )
        );
    }
  }, [deleteConfirmed]);

  const onPageChange = (selected) => {
    setPage(selected + 1);
    setChangeList(!changeList);
  };

  const renderTableData = () => {
    return adminQuiz?.map((quiz, idx) => {
      return (
        <tr key={idx}>
          <td id={style.tableData}>{quiz.id}</td>
          <td id={style.buttonColumn}>
            <center>
              <Link to={`/admin/quizzes/${quiz.id}`}>
                <Button buttonLabel="Edit" buttonSize="sm" />
              </Link>
            </center>
            <center>
              <Button
                buttonLabel="Delete"
                buttonSize="sm"
                outline={true}
                onClick={() => {
                  setItemToDelete(quiz);
                  setShowConfirmationModal(true);
                }}
              />
            </center>
          </td>
          <td id={style.tableData}>{quiz.name}</td>
          <td id={style.tableData}>{quiz.title}</td>
        </tr>
      );
    });
  };

  return (
    <div className={style.cardContainer}>
      <ConfirmationModal
        showModal={showConfirmationModal}
        setShowModal={setShowConfirmationModal}
        itemToDelete={itemToDelete.title}
        setDeleteConfirmed={setDeleteConfirmed}
      />
      <div>
        <div className={style.header}>
          <p className={style.title}>Quizzes</p>
          <Button
            buttonStyle={style.addButton}
            onClick={() => setAddModalShow(true)}
            buttonLabel="Add a Quiz"
            buttonSize="def"
          />
        </div>
        <Col>
          <Card className={style.mainCard}>
            <Card.Header className={style.cardHeader}>
              <SearchBar
                placeholder="Filter by name"
                search={search}
                setSearch={setSearch}
              />
              <FilterDropdown
                dropdownLabel={'Filter by Category'}
                dropdownItems={categories}
                isScrollable={true}
                filter={filter}
                setFilter={setFilter}
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
                  data={adminQuiz}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </div>
      <div className="pt-4">
        <div id={style.pagination}>
          <Pagination
            page={page}
            perPage={perPage}
            totalItems={totalItems}
            pageCount={lastPage}
            onPageChange={onPageChange}
          ></Pagination>
        </div>
        <AddQuizModal
          handleOnSubmit={handleOnSubmit}
          submitStatus={submitStatus}
          modalShow={showAddModal}
          setModalShow={setAddModalShow}
          errors={errors}
          location={location}
          setLocation={setLocation}
          type={TYPE}
        />
      </div>
    </div>
  );
};

export default QuizList;
