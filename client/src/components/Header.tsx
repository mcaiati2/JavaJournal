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
    <Navbar bg="dark" data-bs-theme="dark" className="sticky-header">
      <Container className="nav-wrap classN">
        <Navbar.Brand as={NavLink} to="/" className="crete-round-font">JavaJournal</Navbar.Brand>
        <Nav className="ms-auto">



          {state.user ? (
            <>
              
                <Nav.Link className="border-bottom mb-2 welcome" onClick={() => navigate('/')}>Welcome, {state.user.username}!</Nav.Link>
              
              <Nav.Link as={NavLink} to="/dashboard">My Journal</Nav.Link>
              <Nav.Link as={NavLink} to="/shop">Add Shop</Nav.Link>
              <Nav.Link as={NavLink} to="/coffee-info">Discover</Nav.Link> {/* Add this line */}

              <NavDropdown title="Settings">

                <NavDropdown.Item as={NavLink} to="/settings">Change Password</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/about">About</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/contact">Contact</NavDropdown.Item>
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