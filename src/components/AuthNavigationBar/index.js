import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import style from './index.module.css';

const AuthNavigationBar = () => {
  return (
    <Navbar id={style.navbar} expand="lg">
      <Container fluid>
        <Navbar.Brand id={style.title}>E-LEARNING</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default AuthNavigationBar;
