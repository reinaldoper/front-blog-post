import { useState } from "react"
import { User } from "../service/fetch";
import { useNavigate, Link } from "react-router-dom";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

const Home = () => {
  const [msg, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const requeredToken = async () => {
    if (!validarEmail(email)) {
      setMessage('Email is not valid.');
      setRedirect(true);
      setEmail('');
    } else {
      setMessage('');
      setRedirect(true);
      const options = {
        method: "PATCH",
        body: JSON.stringify({ email: email }),
        headers: {
          'Content-Type': 'application/json',
        }
      }

      const { token, error } = await User(options, 'user/token');
      if (error) {
        setRedirect(true);
        setMessage(error);
        setEmail('');
      } else if (token) {
        setMessage('');
        setEmail('');
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        navigate('/posts');
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
                  <h2 className="fw-bold mb-2 text-uppercase ">Brand</h2>
                  <p className=" mb-5">Please enter your email!</p>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </Form.Group>

                      <div className="d-grid">
                        <Button variant="primary" type="button" onClick={requeredToken}>
                          Login
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        <Link to="/users" >Create User</Link>
                      </p>
                      <p className="mb-0  text-center">
                        <Link to="/update-user" >User update</Link>
                      </p>
                    </div>
                  </div>
                </div>
                {redirect ? <h2>{msg}</h2> : null}
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </Container>

    </div>
  )
}

export default Home
