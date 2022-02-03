import React from 'react';
import { useToast } from '../../hooks/useToast';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Nav, NavDropdown } from 'react-bootstrap';
import { IoLibraryOutline } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { BiLogOutCircle } from 'react-icons/bi';
import Cookies from 'js-cookie';

import style from './index.module.css';
import AuthApi from '../../api/Auth';

const NavigationBar = () => {
  const toast = useToast();

  const onLogout = async () => {
    toast('Processing', 'Logging out...');

    try {
      await AuthApi.logout();
      toast('Success', 'Successfully Logged Out.');
      Cookies.remove('access_token');
      window.location = '/login';
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <Navbar expand="lg" className={style.navbar}>
      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand href="#" className={style.title}>
            E-LEARNING
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="ml-auto">
            <LinkContainer to="/">
              <Nav.Link href="#" className={style.navbarLink}>
                Dashboard
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/categories">
              <Nav.Link href="#" className={style.navbarLink}>
                Categories
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/students">
              <Nav.Link href="#" className={style.navbarLink}>
                Students
              </Nav.Link>
            </LinkContainer>
            <NavDropdown
              title={
                <center>
                  <img
                    src="https://www.freeiconspng.com/thumbs/profile-icon-png/account-profile-user-icon--icon-search-engine-10.png"
                    className={style.dropdownTitleIcon}
                    alt="Profile Icon"
                  />
                </center>
              }
              id={style.dropdownMenu}
              align="end"
            >
              <LinkContainer exact to="/learnings" activeClassName={style.colorActive}>
                <NavDropdown.Item href="#" className={style.dropdownItem}>
                  <IoLibraryOutline />{' '}
                  <span className={style.dropdownItemName}>Learnings</span>
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer exact to="/profile" activeClassName={style.colorActive}>
                <NavDropdown.Item href="#" className={style.dropdownItem}>
                  <CgProfile /> <span className={style.dropdownItemName}>Profile</span>
                </NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item
                href="#"
                className={style.dropdownItem}
                onClick={onLogout}
              >
                <BiLogOutCircle />{' '}
                <span className={style.dropdownItemName}>Logout</span>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
