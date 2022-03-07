import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useToast } from '../../../../hooks/useToast';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { VscFilter } from 'react-icons/vsc';
import { BiSearch } from 'react-icons/bi';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import Pagination from '../../../../components/Pagination';
import DataTable from '../../../../components/DataTable';
import AdminApi from '../../../../api/Admin';
import style from './index.module.scss';

const AdminList = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const pageNum = queryParams.get('page');
  const sortBy = queryParams.get('sortBy') || '';
  const sortDirection = queryParams.get('sortDirection') || '';
  const history = useHistory();
  const toast = useToast();

  const [adminAccounts, setAdminAccounts] = useState();
  const [page, setPage] = useState(pageNum ? parseInt(pageNum) : 1);
  const [perPage, setPerPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [sortOptions, setSortOptions] = useState({
    sortBy,
    sortDirection
  });

  const tableHeaderNames = [
    { title: 'ID' },
    { title: 'Name' },
    { title: 'Email' },
    { title: 'Edit' }
  ];

  useEffect(() => {
    AdminApi.getAdminAccounts({ page })
      .then(({ data }) => {
        setAdminAccounts(data.data);
        setPerPage(data.per_page);
        setTotalItems(data.total);
        setLastPage(data.last_page);
      })
      .catch(() =>
        toast('Error', 'There was an error getting the list of admin accounts.')
      );
  }, [page]);

  const onPageChange = (selected) => {
    setPage(selected + 1);

    history.push(`?page=${selected + 1}`);
  };

  const renderTableData = () => {
    return adminAccounts?.map((admin, idx) => {
      return (
        <tr key={idx} className={style.tableDataRow}>
          <td className={style.tableData}>{admin.id}</td>
          <td className={style.tableData}>{admin.name}</td>
          <td className={style.tableData}>{admin.email}</td>
          <td className={`${style.tableData} ${style.buttonColumn}`}>
            <Link to={`/admin/admins/${admin.id}`}>
              <FaRegEdit size="20px" color="black" />
            </Link>
          </td>
          <td className={`${style.tableData} ${style.buttonColumn}`}>
            <RiDeleteBin2Fill size="25px" color="#db7771" />
          </td>
        </tr>
      );
    });
  };

  return (
    <div className={style.mainContent}>
      <div>
        <h1 className={style.pageTitle}>Admin Accounts</h1>
      </div>
      <Card className={style.card}>
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
        <Card.Body className={style.cardBody}>
          <Button className={style.addAdminButton}>Add an Admin</Button>
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
        <Pagination
          page={page}
          perPage={perPage}
          totalItems={totalItems}
          pageCount={lastPage}
          onPageChange={onPageChange}
        />
      </section>
    </div>
  );
};

export default AdminList;
