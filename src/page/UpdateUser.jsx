import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../service/fetch";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

const UpdateUser = () => {
  const [name, setName] = useState('');
  const [msg, setMessage] = useState('');

  const navigate = useNavigate();

  const update = async () => {
    const token = localStorage.getItem('token');
    const options = {
      method: "PUT",
      body: JSON.stringify({ name: name }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      }
    }

    const { message, error } = await User(options, 'user');
    if (error) {
      setMessage(error);
      setName('');
    } else if (message) {
      setMessage('');
      setName('');
      navigate('/');
    }
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
                  <h2 className="fw-bold mb-2 text-uppercase ">Brand</h2>
                  <p className=" mb-5">Please enter your name!</p>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Name
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                      </Form.Group>

                      <div className="d-grid">
                        <Button variant="primary" type="button" onClick={update}>
                          Update
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

export default UpdateUser;
