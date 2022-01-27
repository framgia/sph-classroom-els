import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { ImUser } from 'react-icons/im';
import { BiCategory, BiLogOutCircle, BiShieldQuarter } from 'react-icons/bi';
import { IoIosPeople } from 'react-icons/io';

import style from './index.module.css';

const NavigationSideBar = () => {
  return (
    <Navbar
      expand="lg"
      className={`${style.navbar} ${style.displayFlexColumn}`}
    >
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
          <p className={style.username}>John Doe</p>
          <p className={style.userRole}>Admin</p>
        </div>
      </div>
      <Container
        className={`${style.navItemsContainer} ${style.displayFlexColumn}`}
      >
        <LinkContainer
          to="/admin"
          className={`${style.displayFlexRow} ${style.navItemInfo}`}
        >
          <Nav.Link href="#" className={style.navItem}>
            <ImUser className={style.icon} />
            <span className={style.alignContent}>Profile</span>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer
          to="/admin"
          className={`${style.displayFlexRow} ${style.navItemInfo}`}
        >
          <Nav.Link href="#" className={style.navItem}>
            <BiCategory className={style.icon} />
            <span className={style.alignContent}>Categories</span>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer
          to="/admin"
          className={`${style.displayFlexRow} ${style.navItemInfo}`}
        >
          <Nav.Link href="#" className={style.navItem}>
            <IoIosPeople className={style.icon} />
            <span className={style.alignContent}>Students</span>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer
          to="/admin"
          className={`${style.displayFlexRow} ${style.navItemInfo}`}
        >
          <Nav.Link href="#" className={style.navItem}>
            <BiShieldQuarter className={style.icon} />
            <span className={style.alignContent}>Admins</span>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin">
          <Nav.Link
            href="#"
            className={`${style.logoutPosition} ${style.navLogout}`}
          >
            <BiLogOutCircle className={style.icon} /> <span>Logout</span>
          </Nav.Link>
        </LinkContainer>
      </Container>
    </Navbar>
  );
};

export default NavigationSideBar;
