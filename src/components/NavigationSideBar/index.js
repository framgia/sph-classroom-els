import React, { useContext, useState, useEffect } from 'react';
import { useToast } from '../../hooks/useToast';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { ImUser } from 'react-icons/im';
import { BiCategory, BiLogOutCircle, BiShieldQuarter } from 'react-icons/bi';
import { BsCardChecklist } from 'react-icons/bs';
import { AdminContext } from '../../context/adminContext';
import AuthApi from '../../api/Auth';
import Cookies from 'js-cookie';
import style from './index.module.scss';

const NavigationSideBar = () => {
  const toast = useToast();
  const { name } = useContext(AdminContext);

  const [activeLink, setActiveLink] = useState(
    parseInt(window.localStorage.getItem('active-link')) || 1
  );

  useEffect(() => {
    window.localStorage.setItem('active-link', activeLink);
  }, [activeLink]);

  const navLinks = [
    {
      name: 'Profile',
      path: '/admin/profile',
      icon: <ImUser className={style.icon} />
    },
    {
      name: 'Categories',
      path: '/admin/categories',
      icon: <BiCategory className={style.icon} />
    },
    {
      name: 'Category Hierarchy',
      path: '/admin/category-hierarchy',
      icon: <BiCategory className={style.icon} />
    },
    {
      name: 'Quizzes',
      path: '/admin/quizzes',
      icon: <BsCardChecklist className={style.icon} />
    },
    {
      name: 'Admins',
      path: '/admin/users',
      icon: <BiShieldQuarter className={style.icon} />
    }
  ];

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
        <div className={style.adminInfo}>
          <p className={style.username}>{name}</p>
          <p className={style.userRole}>Admin</p>
        </div>
      </div>
      <Container
        fluid
        className={`${style.navItemsContainer} ${style.displayFlexColumn}`}
      >
        {navLinks.map((navLink, idx) => {
          return (
            <LinkContainer
              key={idx}
              to={navLink.path}
              onClick={() => setActiveLink(idx)}
              className={`${style.displayFlexRow} ${style.navItemInfo}`}
            >
              <Nav.Link
                href="#"
                className={
                  activeLink === idx ? style.activeNavItem : style.navItem
                }
              >
                {navLink.icon}
                <span className={style.alignContent}>{navLink.name}</span>
              </Nav.Link>
            </LinkContainer>
          );
        })}
      </Container>
      <Nav.Link
        href="#"
        className={`${style.logoutPosition} ${style.navLogout}`}
        onClick={onLogout}
      >
        <BiLogOutCircle className={style.iconLogout} /> <span>Logout</span>
      </Nav.Link>
    </Navbar>
  );
};

export default NavigationSideBar;
