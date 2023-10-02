import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../service/fetch";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

const Users = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [msg, setMessage] = useState('');

  const navigate = useNavigate();

  const createUser = async () => {
    if (!validarEmail(email)) {
      setMessage('Email is not valid.');
      setEmail('');
    } else {
      const options = {
        method: "POST",
        body: JSON.stringify({ email: email, name: name }),
        headers: {
          'Content-Type': 'application/json',
        }
      }

      const { message, error } = await User(options, 'user');
      if (error) {
        setMessage(error);
        setEmail('');
        setName('');
      } else if (message) {
        setMessage('');
        setEmail('');
        setName('');
        navigate('/');
      }
    }
  }

  const validarEmail = (email) => {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">User create</h2>
                  <p className=" mb-5">Please enter your name and email!</p>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="button" onClick={createUser}>
                          Create User
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        <Link to="/" >Login</Link>
                      </p>
                    </div>
                  </div>
                </div>
                {msg.length > 0 ? <h2>{msg}</h2> : null}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
      </Container>
      
    </div>
  )
}

export default Users;
