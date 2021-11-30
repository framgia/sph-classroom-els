import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { BiFilterAlt } from 'react-icons/bi';
import { BiSearch } from 'react-icons/bi';
import Button from '@restart/ui/esm/Button';
import Spinner from 'react-bootstrap/Spinner';

import style from './index.module.css';

import StudentApi from '../../../../api/Student';

const StudentList = () => {
  const queryParams = new URLSearchParams(window.location.search);
  // const pageNum = queryParams.get('page'); Will use this in pagination functionality
  const filterVal = queryParams.get('filter');
  const searchVal = queryParams.get('search');
  const history = useHistory();

  const page = 0; //This is a temporary variable, will change this when I am about to implement the pagination for this page in another task
  const [students, setStudents] = useState(null);
  const [search, setSearch] = useState(searchVal ? searchVal : '');
  const [status, setStatus] = useState(false);
  const [filter, setFilter] = useState(filterVal ? filterVal : '');
  const [listInfo, setListInfo] = useState(
    filterVal === 'followed'
      ? 'Followed Students'
      : filterVal === 'followers'
      ? 'Followers'
      : filterVal === null
      ? 'All Students'
      : ''
  );

  useEffect(() => {
    history.push(`?page=${page}&filter=${filter}&search=${search}`);
    StudentApi.getAll({ page: page, filter: filter, search: search }).then(
      ({ data }) => {
        setStudents(data.data);
      }
    );
  }, [status]);

  const onSearchSubmit = (e) => {
    e.preventDefault();

    history.push(`?page=${page}&filter=${filter}&search=${search}`);

    StudentApi.getAll({ page: page, filter: filter, search: search }).then(
      ({ data }) => setStudents(data.data)
    );
  };

  const onFilterClick = (filter) => {
    history.push(`?page=${page}&filter=${filter}&search=${search}`);

    StudentApi.getAll({ page: page, filter: filter, search: search }).then(
      ({ data }) => {
        setStudents(data.data);
      }
    );
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
          variant='primary'
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
          variant='primary'
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
          <div className={style.s_h3}>
            <img
              src='https://scontent.xx.fbcdn.net/v/t1.15752-9/cp0/261163455_453166156175670_160593561815661759_n.png?_nc_cat=104&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeEr9QWUzJUU_Fl3Cwa6Og1hItwF4oLi_9si3AXiguL_24VoQld8u4528RHx5ywaOWtTql7cudY0IPOlFkj5UjIC&_nc_ohc=GddmaT-WdZAAX96Nv-S&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=7de756e93af262f36949cfcad9d768af&oe=61C67DE3'
              alt='add user'
              width='30px'
              height='30px'
            />
            <span className={style.margineforspan}>{student.name}</span>
            {followButton(student.has_followed, student.id)}
          </div>
          <div id={style.floatrighttext}>
            <div> {student.followers_count} Followers </div>
            <div className={style.followerstextindentstyle}>
              {student.followings_count} Following
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div
      className='d-flex justify-content-center'
      style={{ marginTop: '120px', display: 'block' }}
    >
      <div>
        <div className={style.listofstudenttext}>List of {listInfo}</div>
        <Card>
          <Card.Header className={style.CardHeaderstyle}>
            <form onSubmit={onSearchSubmit}>
              <input
                className={style.inputstyle}
                type='search'
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);

                  if (e.target.value.length === 0) {
                    setStatus(!status);
                  }
                }}
                name='search'
                placeholder='Search'
              />
              <Button type='submit' className={style.searchButton}>
                <BiSearch className={style.iconsearchstyle} />
              </Button>
            </form>
            <Dropdown>
              <Dropdown.Toggle
                className={style.Dropdownstyle}
                variant='link'
                bsPrefix='none'
              >
                <span className={style.Textfordropdownstyle}> Filter </span>
                <BiFilterAlt size='20px' />
              </Dropdown.Toggle>
              <Dropdown.Menu className={style.Dropdownmenustyle}>
                <Dropdown.Item
                  className={style.Dropdownitemstyle}
                  onClick={() => {
                    setFilter('');
                    setStatus(!status);
                    setListInfo('All Students');
                  }}
                >
                  All
                </Dropdown.Item>
                <Dropdown.Item
                  className={style.Dropdownitemstyle}
                  onClick={() => {
                    onFilterClick('followed');
                    setFilter('followed');
                    setListInfo('Followed Students');
                  }}
                >
                  Following
                </Dropdown.Item>
                <Dropdown.Item
                  className={style.Dropdownitemstyle}
                  onClick={() => {
                    onFilterClick('followers');
                    setFilter('followers');
                    setListInfo('Followers');
                  }}
                >
                  Followers
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Card.Header>
          <Card.Body className={`${style.cal_02} ${style.cal_3}`}>
            {students?.length <= 0 ? (
              <div className={style.noResults}>
                {' '}
                <p>No Student Found</p>{' '}
              </div>
            ) : (
              ''
            )}
            {students === null ? (
              <div className={style.loading}>
                <Spinner animation='border' role='status'></Spinner>
                <span className={style.loadingWord}>Loading</span>
              </div>
            ) : (
              renderStudList()
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default StudentList;
