import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { User } from '../service/fetch';

const NavbarUser = () => {
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState(false);

  useEffect(() => {
    result();
  }, [])

  const result = async () => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const options = {
      method: "PATCH",
      body: JSON.stringify({
        email: email,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      }
    }
    const { error, message } = await User(options, 'user/email');
    if (message) {
      setDescription(true);
      setName(message)
    } else if (error) {
      setError(error);
    }
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container style={{ backgroundColor: '#bbdec6', borderRadius: '5px'}}>
        <Navbar.Brand as={Link} to="/">Login - Page</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/my-post">Post-delete</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/update">Post-update</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/posts">
                All posts
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/users">Create User</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/update-user">User-update</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {error.length > 0 ? <h2>{error}</h2>: null}
          { description ? <span style={{marginRight: '1.5vw'}}>Name: { name.name }</span>: <h2>Carregando...</h2>}
          { description ? <span style={{marginLeft: '1.5vw'}}>Email: { name.email } </span>: <h2>Carregando...</h2> }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarUser;
