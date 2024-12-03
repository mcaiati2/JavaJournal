import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { useStore } from '../store';
import { LOGOUT_USER } from '../graphql/mutations';
import { client } from '../main';

function Header() {
  const { state, setState } = useStore()!;
  const [logoutUser] = useMutation(LOGOUT_USER, {
    onCompleted() {
      client.clearStore();
    }
  });
  const navigate = useNavigate();

  const handleLogout = async (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();

    await logoutUser();

    setState((oldState) => ({
      ...oldState,
      user: null
    }));

    navigate('/');
  }

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container className="nav-wrap">
        <Navbar.Brand as={NavLink} to="/">JavaJournal</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={NavLink} to="/">Home</Nav.Link>
          <Nav.Link as={NavLink} to="/about">About</Nav.Link>

          {state.user ? (
            <>
              <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
              <Nav.Link as={NavLink} to="/shop">Add Shop</Nav.Link>
              <Nav.Link as={NavLink} to="/coffee-info">Coffee Info</Nav.Link> {/* Add this line */}
              <NavLink className="nav-link" to="/contact">Contact</NavLink>
              <NavDropdown title="Profile Menu">
                <NavDropdown.ItemText className="border-bottom mb-2">Welcome, {state.user.username}</NavDropdown.ItemText>
                <NavDropdown.Item as={NavLink} to="/settings">Change Password</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout} href="/logout">Log Out</NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <>
              <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
              <Nav.Link as={NavLink} to="/login">Log In</Nav.Link>
            </>
          )}

        </Nav>
      </Container>
    </Navbar>
  )
}

export default Header;