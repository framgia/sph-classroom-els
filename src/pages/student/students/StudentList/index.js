import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useToast } from '../../../../hooks/useToast';
import { Card } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import Pagination from '../../../../components/Pagination';

import style from './index.module.scss';

import StudentApi from '../../../../api/Student';
import SearchBar from '../../../../components/SearchBar';
import FilterDropdown from '../../../../components/FilterDropdown';
import Button from '../../../../components/Button';

const StudentList = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const pageNum = queryParams.get('page');
  const filterVal = queryParams.get('filter');
  const searchVal = queryParams.get('search');

  const history = useHistory();
  const toast = useToast();

  const [page, setPage] = useState(pageNum ? parseInt(pageNum) : 1);
  const [perPage, setPerPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [lastPage, setLastPage] = useState(0);

  const [students, setStudents] = useState(null);
  const [search, setSearch] = useState(searchVal ? searchVal : '');
  const [status, setStatus] = useState(false);
  const [filter, setFilter] = useState(filterVal ? filterVal : '');

  useEffect(() => {
    history.push(`?page=${page}&filter=${filter}&search=${search}`);

    StudentApi.getAll({ page: page, filter: filter, search: search }).then(
      ({ data }) => {
        setStudents(data.data);
        setPerPage(data.per_page);
        setTotalItems(data.total);
        setLastPage(data.last_page);
      }
    );
  }, [status, page, filter, search]);

  const onPageChange = (selected) => {
    setPage(selected + 1);

    history.push(`?page=${selected + 1}&filter=${filter}&search=${search}`);
  };

  const onFollowClick = (userid, name) => {
    toast('Processing', `Following ${name}...`);

    StudentApi.follow(userid).then(() => {
      toast('Success', `Successfully Followed ${name}.`);
      setStatus(!status);
    });
  };

  const onUnfollowClick = (userid, name) => {
    toast('Processing', `Unfollowing ${name}...`);

    StudentApi.unfollow(userid).then(() => {
      toast('Success', `Successfully Unfollowed ${name}.`);
      setStatus(!status);
    });
  };

  const followButton = (status, userid, name) => {
    if (status) {
      return (
        <Button
          buttonLabel="Unfollow"
          buttonSize="sm"
          onClick={() => {
            onUnfollowClick(userid, name);
          }}
        />
      );
    } else {
      return (
        <Button
          buttonLabel="Follow"
          buttonSize="sm"
          onClick={() => {
            onFollowClick(userid, name);
          }}
        />
      );
    }
  };

  const renderStudList = () => {
    return students?.map((student, idx) => {
      return (
        <div key={idx}>
          <div className={style.studentInfo}>
            <div>
              <Link to={`/students/${student.id}`}>
                <span className={style.studentName}>{student.name}</span>
              </Link>
              <div id={style.followCount}>
                <div>{student.followers_count} Followers</div>
                <div>{student.followings_count} Following</div>
              </div>
            </div>

            {followButton(student.has_followed, student.id, student.name)}
          </div>
        </div>
      );
    });
  };

  const studentFilter = [
    {
      name: 'All',
      value: ''
    },
    {
      name: 'Following',
      value: 'followed'
    },
    {
      name: 'Followers',
      value: 'followers'
    }
  ];

  const onSelectFilterStudent = (e) => {
    setFilter(e);
    setPage(1);
  };

  const choice = (option) => {
    switch (option) {
    case '':
      return 'All';
    case 'followed':
      return 'Following';
    case 'followers':
      return 'Followers';
    default:
      break;
    }
  };

  const listInfoFilter = (option) => {
    switch (option) {
    case '':
      return 'All Students';
    case 'followed':
      return 'Followed Students';
    case 'followers':
      return 'Followers';
    default:
      break;
    }
  };

  const obtainFilteredData = (value) => {
    setFilter(value.value);
  };

  return (
    <div className={style.studentListContainer}>
      <div>
        <div className={style.studentListHeader}>
          List of {listInfoFilter(filter)}
        </div>
        <Card>
          <Card.Header className={style.cardHeader}>
            <SearchBar
              placeholder="Search"
              search={search}
              inputSize="md"
              sourceDesign={style.inputHieght}
              setSearch={setSearch}
            />
            <FilterDropdown
              onSelect={onSelectFilterStudent}
              onHardStyle={style.dropdownButtonStyle}
              onHardCodeStyle={style.dropdownMenuStyle}
              dropdownItems={studentFilter}
              onDataNeeded={false}
              onAll={false}
              filter={choice(filter)}
              onSetFilter={obtainFilteredData}
            />
          </Card.Header>
          <Card.Body className={style.cardBody}>
            {!students ? (
              <div className={style.loading}>
                <Spinner animation="border" role="status"></Spinner>
                <span className={style.loadingWord}>Loading</span>
              </div>
            ) : (
              renderStudList()
            )}
            {students?.length <= 0 ? (
              <div className={style.noResults}>
                {' '}
                <p>No Student Found</p>{' '}
              </div>
            ) : (
              <div className={style.pagination}>
                <Pagination
                  page={page}
                  perPage={perPage}
                  totalItems={totalItems}
                  pageCount={lastPage}
                  onPageChange={onPageChange}
                ></Pagination>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default StudentList;
