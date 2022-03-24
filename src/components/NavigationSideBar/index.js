import React, { useState, useEffect } from 'react';
import { useToast } from '../../hooks/useToast';
import Navbar from 'react-bootstrap/Navbar';
import { Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { ImUser } from 'react-icons/im';
import { BiCategory, BiLogOutCircle, BiShieldQuarter } from 'react-icons/bi';
import { BsCardChecklist } from 'react-icons/bs';
import Cookies from 'js-cookie';
import AdminApi from '../../api/Admin';

import style from './index.module.css';
import AuthApi from '../../api/Auth';

const NavigationSideBar = () => {
  const toast = useToast();
  const [profileName, setprofileName] = useState(null);
  const loggedInUserId = Cookies.get('admin_id');

  useEffect(() => {
    AdminApi.getAllUsers(loggedInUserId).then(({ data }) => {
      setprofileName(data[0]);
    });
  }, []);

  const onLogout = async () => {
    toast('Processing', 'Logging out...');

    try {
      await AuthApi.logout();
      Cookies.remove('access_token');
      window.location = '/admin/login';
    } catch (error) {
      toast('Error', error);
    }
  };

  return (
    <Navbar className={`${style.navbar} ${style.displayFlexColumn}`}>
      <Navbar.Brand href="#" className={style.title}>
        E-LEARNING
      </Navbar.Brand>
      <div>
        <div className={`${style.displayFlexColumn} ${style.adminInfo}`}>
          <div className={`${style.iconBackground} ${style.displayFlexRow}`}>
            <img
              src="https://www.freeiconspng.com/thumbs/profile-icon-png/account-profile-user-icon--icon-search-engine-10.png"
              className={style.userIcon}
              alt="Profile Icon"
            />
          </div>
          <p className={style.username}>{profileName?.name}</p>
          <p className={style.userRole}>Admin</p>
        </div>
      </div>
      <Container
        fluid
        className={`${style.navItemsContainer} ${style.displayFlexColumn}`}
      >
        <LinkContainer
          to="/admin/profile"
          className={`${style.displayFlexRow} ${style.navItemInfo}`}
        >
          <Nav.Link href="#" className={style.navItem}>
            <ImUser className={style.icon} />
            <span className={style.alignContent}>Profile</span>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer
          to="/admin/categories"
          className={`${style.displayFlexRow} ${style.navItemInfo}`}
        >
          <Nav.Link href="#" className={style.navItem}>
            <BiCategory className={style.icon} />
            <span className={style.alignContent}>Categories</span>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer
          to="/admin/category-hierarchy"
          className={`${style.displayFlexRow} ${style.navItemInfo}`}
        >
          <Nav.Link href="#" className={style.navItem}>
            <BiCategory className={style.icon} />
            <span className={style.alignContent}>Category Hierarchy</span>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer
          to="/admin/quizzes"
          className={`${style.displayFlexRow} ${style.navItemInfo}`}
        >
          <Nav.Link href="#" className={style.navItem}>
            <BsCardChecklist className={style.icon} />
            <span className={style.alignContent}>Quizzes</span>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer
          to="/admin/users"
          className={`${style.displayFlexRow} ${style.navItemInfo}`}
        >
          <Nav.Link href="#" className={style.navItem}>
            <BiShieldQuarter className={style.icon} />
            <span className={style.alignContent}>Admins</span>
          </Nav.Link>
        </LinkContainer>
        <Nav.Link
          href="#"
          className={`${style.logoutPosition} ${style.navLogout}`}
          onClick={onLogout}
        >
          <BiLogOutCircle className={style.iconLogout} /> <span>Logout</span>
        </Nav.Link>
      </Container>
    </Navbar>
  );
};

export default NavigationSideBar;
