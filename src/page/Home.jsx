import { useState } from "react";
import { User } from "../service/fetch";
import { useNavigate, Link } from "react-router-dom";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  AOS.init({
    duration: 2500,
  });

  const [msg, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const requiredToken = async () => {
    if (!validateEmail(email)) {
      setMessage('Email is not valid.');
      setRedirect(true);
      setEmail('');
    } else {
      setMessage('Loading...');
      setRedirect(true);

      const options = {
        method: "PATCH",
        body: JSON.stringify({ email: email }),
        headers: {
          'Content-Type': 'application/json',
        }
      }

      try {
        const { token, error } = await User(options, 'user/token');

        if (error) {
          setRedirect(true);
          setMessage(error);
          setEmail('');
        } else if (token) {
          setRedirect(true);
          setEmail('');
          localStorage.setItem('token', token);
          localStorage.setItem('email', email);
          navigate('/posts');
        }
      } catch (error) {
        setRedirect(true);
        setMessage('An error occurred while processing your request.');
        setEmail('');
      }
    }
  }

  const validateEmail = (email) => {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const getGreeting = () => {
    const data = new Date();
    const dia = data.getDate();
    const ano = data.getFullYear();
    let month = data.getMonth();
    
    if (month === 12) {
      month = 0;
    }

    const hs = data.getHours();
    const horasNumericas = parseInt(hs, 10);

    let saudacao = '';

    if (horasNumericas >= 5 && horasNumericas <= 12) {
      saudacao = 'Good morning!';
    } else if (horasNumericas > 12 && horasNumericas <= 17) {
      saudacao = 'Good afternoon';
    } else {
      saudacao = 'Good night';
    }

    if (dia < 10) {
      return `0${dia}/${month + 1}/${ano} - ${saudacao}`;
    } else {
      return `${dia}/${month + 1}/${ano} - ${saudacao}`;
    }
  }

  return (
    <div>
      <Container data-aos="zoom-in">
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">Login</h2>
                  <p className=" mb-5">Please enter your email!</p>
                  <div className="mb-3">
                    <Form>
                      <h2>{getGreeting()}</h2>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </Form.Group>

                      <div className="d-grid">
                        <Button variant="primary" type="button" onClick={requiredToken}>
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

export default Home;
