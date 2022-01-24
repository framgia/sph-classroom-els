import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { VscFilter } from 'react-icons/vsc';
import { BiSearch } from 'react-icons/bi';
import Button from '@restart/ui/esm/Button';
import Spinner from 'react-bootstrap/Spinner';
import Pagination from '../../../../components/Pagination';

import style from './index.module.css';

import StudentApi from '../../../../api/Student';

const StudentList = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const pageNum = queryParams.get('page');
  const filterVal = queryParams.get('filter');
  const searchVal = queryParams.get('search');
  const history = useHistory();

  const [page, setPage] = useState(pageNum ? parseInt(pageNum) : 1);
  const [perPage, setPerPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [lastPage, setLastPage] = useState(0);

  const [students, setStudents] = useState(null);
  const [search, setSearch] = useState(searchVal ? searchVal : '');
  const [status, setStatus] = useState(false);
  const [filter, setFilter] = useState(filterVal ? filterVal : '');
  const [listInfo, setListInfo] = useState(
    filterVal === 'followed'
      ? 'Followed Students'
      : filterVal === 'followers'
      ? 'Followers'
      : 'All Students'
  );

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
  }, [status, page, filter]);

  const onPageChange = (selected) => {
    setPage(selected + 1);

    history.push(`?page=${selected + 1}&filter=${filter}&search=${search}`);
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();

    setStatus(!status);
    setPage(1);
  };

  const onFollowClick = (userid) => {
    StudentApi.follow(userid).then(() => {
      setStatus(!status);
    });
  };

  const onUnfollowClick = (userid) => {
    StudentApi.unfollow(userid).then(() => {
      setStatus(!status);
    });
  };

  const followButton = (status, userid) => {
    if (status) {
      return (
        <Button
          className={style.button}
          variant="primary"
          onClick={() => {
            onUnfollowClick(userid);
          }}
        >
          Unfollow
        </Button>
      );
    } else {
      return (
        <Button
          className={style.button}
          variant="primary"
          onClick={() => {
            onFollowClick(userid);
          }}
        >
          Follow
        </Button>
      );
    }
  };

  const renderStudList = () => {
    return students?.map((student, idx) => {
      return (
        <div key={idx}>
          <div className={style.studentInfo}>
            <img
              alt="avatar"
              src={
                student.avatar === null
                  ? 'https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png'
                  : student.avatar
              }
              className={style.avatar}
            />

            <div>
              <Link to={`/students/${student.id}`}>
                <span className={style.studentName}>{student.name}</span>
              </Link>
              <div id={style.followCount}>
                <div>{student.followers_count} Followers</div>
                <div>{student.followings_count} Following</div>
              </div>
            </div>

            {followButton(student.has_followed, student.id)}
          </div>
        </div>
      );
    });
  };

  return (
    <div className={style.studentListContainer}>
      <div>
        <div className={style.studentListHeader}>List of {listInfo}</div>
        <Card>
          <Card.Header className={style.cardHeader}>
            <form onSubmit={onSearchSubmit}>
              <input
                className={style.inputStyle}
                type="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);

                  if (e.target.value.length === 0) {
                    setPage(1);
                    setStatus(!status);
                  }
                }}
                name="search"
                placeholder="Search"
              />
              <Button type="submit" className={style.searchButton}>
                <BiSearch className={style.searchIcon} />
              </Button>
            </form>
            <Dropdown>
              <Dropdown.Toggle
                className={style.dropdownStyle}
                variant="link"
                bsPrefix="none"
              >
                <span className={style.dropdownLabel}>Filter</span>
                <VscFilter size="20px" />
              </Dropdown.Toggle>
              <Dropdown.Menu className={style.dropdownMenuStyle}>
                <Dropdown.Item
                  className={style.dropdownItemStyle}
                  onClick={() => {
                    setFilter('');
                    setStatus(!status);
                    setListInfo('All Students');
                    setPage(1);
                  }}
                >
                  All
                </Dropdown.Item>
                <Dropdown.Item
                  className={style.dropdownItemStyle}
                  onClick={() => {
                    setFilter('followed');
                    setListInfo('Followed Students');
                    setPage(1);
                  }}
                >
                  Following
                </Dropdown.Item>
                <Dropdown.Item
                  className={style.dropdownItemStyle}
                  onClick={() => {
                    setFilter('followers');
                    setListInfo('Followers');
                    setPage(1);
                  }}
                >
                  Followers
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Card.Header>
          <Card.Body className={style.cardBody}>
            {students === null ? (
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
