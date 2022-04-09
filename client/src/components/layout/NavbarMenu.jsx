import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import learnitLogo from '../../assets/logo.svg';
import logoutIcon from '../../assets/logout.svg';
import { AuthContext } from '../../contexts/AuthContext';

function NavbarMenu() {
  const {
    authState: {
      user: { username },
    },
    logoutUser,
  } = useContext(AuthContext);
  const logout = () => logoutUser();
  return (
    <Navbar expand="lg" bg="primary" variant="dark" className="shadow px-3">
      <Navbar.Brand className="font-weight-border text-white">
        <img src={learnitLogo} alt="logo" width="32" height="32" className="me-2" />
        LearnIt
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link className="font-weight-border text-white" to="/dashboard" as={Link}>
            DashBoard
          </Nav.Link>
          <Nav.Link className="font-weight-border text-white" to="/about" as={Link}>
            About
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link className="font-weight-border text-white" disabled>
            Welcome {username}
          </Nav.Link>
          <Button variant="secondary" className="font-weight-border text-white" onClick={logout}>
            <img src={logoutIcon} alt="logout" width="32" height="32" className="me-2" />
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarMenu;
