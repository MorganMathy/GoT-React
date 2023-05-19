import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        {/* Brand */}
        <Navbar.Brand as={Link} to="/">
          Game of Thrones
        </Navbar.Brand>

        {/* Navbar Toggle */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Navbar Collapse */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {/* Home Link */}
            <Nav.Link as={Link} to="/" className="nav-link">
              Home
            </Nav.Link>

            {/* Books Link */}
            <Nav.Link as={Link} to="/books" className="nav-link">
              Books
            </Nav.Link>

            {/* Characters Link */}
            <Nav.Link as={Link} to="/characters" className="nav-link">
              Characters
            </Nav.Link>

            {/* Houses Link */}
            <Nav.Link as={Link} to="/houses" className="nav-link">
              Houses
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
