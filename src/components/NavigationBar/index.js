import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Nav, NavDropdown } from 'react-bootstrap';
import { IoLibraryOutline } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { BiLogOutCircle } from 'react-icons/bi';

import style from './index.module.css';

const NavigationBar = () => {
  return (
    <Navbar expand="lg" className={style.navbar}>
      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand className={style.title}>E-Learning</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="ml-auto">
            <LinkContainer to="/dashboard">
              <Nav.Link className={style.navbarLink}>Dashboard</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/categories">
              <Nav.Link className={style.navbarLink}>Categories</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/students">
              <Nav.Link className={style.navbarLink}>Students</Nav.Link>
            </LinkContainer>
            <NavDropdown
              title={
                <img
                  src="https://www.freeiconspng.com/thumbs/profile-icon-png/account-profile-user-icon--icon-search-engine-10.png"
                  className={style.dropdownTitleIcon}
                />
              }
              id={style.dropdownMenu}
              align="end"
            >
              <LinkContainer to="/learnings">
                <NavDropdown.Item className={style.dropdownItem}>
                  <IoLibraryOutline /> Learnings
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/profile">
                <NavDropdown.Item className={style.dropdownItem}>
                  <CgProfile /> Profile
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/logout">
                <NavDropdown.Item className={style.dropdownItem}>
                  <BiLogOutCircle /> Logout
                </NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
