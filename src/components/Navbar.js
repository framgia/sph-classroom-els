import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { Container, Nav, NavDropdown, Col, Image, Dropdown } from 'react-bootstrap';
import { IoLibraryOutline } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { BiLogOutCircle } from 'react-icons/bi';

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
                            <NavDropdown title={<img src="https://www.freeiconspng.com/thumbs/profile-icon-png/account-profile-user-icon--icon-search-engine-10.png" className="p-icon" />} id="navbarScrollingDropdown" autoClose="outside">
                                <NavDropdown.Item href="" ><IoLibraryOutline /> Learnings</NavDropdown.Item>
                                <NavDropdown.Item href=""><CgProfile /> Profile</NavDropdown.Item>
                                <NavDropdown.Item href=""><BiLogOutCircle /> Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Navbar.Collapse>
                    </Nav>
                </Container>
            </Navbar >
        </div >
    );
}

export default Navigationbar;
