import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useToast } from '../../../../hooks/useToast';
import Card from 'react-bootstrap/Card';
import ConfirmationModal from '../../../../components/ConfirmationModal';
import SearchBar from '../../../../components/SearchBar';
import Pagination from '../../../../components/Pagination';
import DataTable from '../../../../components/DataTable';
import Button from '../../../../components/Button';
import AdminApi from '../../../../api/Admin';
import style from './index.module.scss';

const AdminList = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const pageNum = queryParams.get('page');
  const sortBy = queryParams.get('sortBy') || '';
  const searchVal = queryParams.get('search');
  const sortDirection = queryParams.get('sortDirection') || '';

  const history = useHistory();
  const toast = useToast();

  const [adminAccounts, setAdminAccounts] = useState();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({});
  const [page, setPage] = useState(pageNum ? parseInt(pageNum) : 1);
  const [perPage, setPerPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [search, setSearch] = useState(searchVal ? searchVal : '');
  const [sortOptions, setSortOptions] = useState({
    sortBy,
    sortDirection,
  });

  const tableHeaderNames = [
    { title: 'ID', canSort: true },
    { title: 'Action', canSort: false },
    { title: 'Name', canSort: true },
    { title: 'Email', canSort: true },
  ];

  useEffect(() => {
    history.push(
      `?page=${page}&search=${search}&sortBy=${sortOptions.sortBy}&sortDirection=${sortOptions.sortDirection}`
    );

    load();
  }, [page, search, sortOptions]);

  useEffect(() => {
    if (deleteConfirmed) {
      toast('Processing', `Deleting ${itemToDelete.name}...`);

      AdminApi.deleteAdmin(itemToDelete.id)
        .then(({ data }) => {
          toast('Success', data.message);
          setDeleteConfirmed(false);
          load();
        })
        .catch(() =>
          toast(
            'Error',
            'There was an error encountered while deleting the admin user.'
          )
        );
    }
  }, [deleteConfirmed]);

  const load = () => {
    setAdminAccounts(null);

    AdminApi.getAdminAccounts({
      page,
      search,
      sortBy: sortOptions.sortBy,
      sortDirection: sortOptions.sortDirection,
    })
      .then(({ data }) => {
        setAdminAccounts(data.data);
        setPerPage(data.per_page);
        setTotalItems(data.total);
        setLastPage(data.last_page);
      })
      .catch(() =>
        toast('Error', 'There was an error getting the list of admin accounts.')
      );
  };

  const onPageChange = (selected) => {
    setPage(selected + 1);
  };

  const renderTableData = () => {
    return adminAccounts?.map((admin, idx) => {
      return (
        <tr key={idx} className={style.tableDataRow}>
          <td className={style.tableData}>{admin.id}</td>
          <td className={style.tableData}>
            <Button
              buttonLabel="Delete"
              buttonSize="sm"
              outline={true}
              onClick={() => {
                setItemToDelete(admin);
                setShowConfirmationModal(true);
              }}
            />
          </td>
          <td className={style.tableData}>{admin.name}</td>
          <td className={style.tableData}>{admin.email}</td>
        </tr>
      );
    });
  };

  return (
    <div className={style.mainContent}>
      <ConfirmationModal
        showModal={showConfirmationModal}
        setShowModal={setShowConfirmationModal}
        itemToDelete={itemToDelete.name}
        setDeleteConfirmed={setDeleteConfirmed}
      />
      <div className={style.header}>
        <h1 className={style.pageTitle}>Admin Accounts</h1>
        <Link to="/admin/create-admin-account">
          <Button buttonLabel="Add an Admin" buttonSize="def" />
        </Link>
      </div>
      <Card className={style.card}>
        <Card.Header className={style.cardHeader}>
          <SearchBar
            placeholder="Search by name or email"
            search={search}
            setSearch={setSearch}
          />
        </Card.Header>
        <Card.Body className={style.cardBody}>
          <DataTable
            tableHeaderNames={tableHeaderNames}
            renderTableData={renderTableData}
            titleHeaderStyle={style.tableHeader}
            sortOptions={sortOptions}
            setSortOptions={setSortOptions}
            data={adminAccounts}
          />
        </Card.Body>
      </Card>
      <section>
        <div id={style.pagination}>
          <Pagination
            page={page}
            perPage={perPage}
            totalItems={totalItems}
            pageCount={lastPage}
            onPageChange={onPageChange}
          />
        </div>
      </section>
    </div>
  );
};

export default AdminList;
