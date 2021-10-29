import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { Container, Nav, NavDropdown, NavDropdowncolor } from 'react-bootstrap';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';

function Navigationbar() {
    return (
        <div>
            <Navbar className='navbar' expand="lg">
                <Container fluid>
                    <Navbar.Brand id="title">E-Learning</Navbar.Brand>
                    <Nav
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="#dashboard" id="Nav">Dashboard</Nav.Link>
                        <Nav.Link href="#categories" id="Nav">Categories</Nav.Link>
                        <Nav.Link href="#students" id="Nav">Students</Nav.Link>
                        <Navbar.Collapse id="navbarScrollingDropdown">
                            <NavDropdown align="end" title={<img src="https://www.freeiconspng.com/thumbs/profile-icon-png/account-profile-user-icon--icon-search-engine-10.png" className="p-icon" />} id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#learnings">Learnings</NavDropdown.Item>
                                <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
                                <NavDropdown.Item href="#login">Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Navbar.Collapse>
                    </Nav>
                </Container>
            </Navbar >
        </div >
    );
}

export default Navigationbar;
