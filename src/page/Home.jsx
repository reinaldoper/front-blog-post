import { useState } from "react"
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

  const requeredToken = async () => {
    if (!validarEmail(email)) {
      setMessage('Email is not valid.');
      setRedirect(true);
      setEmail('');
    } else {
      setMessage('Carregando...');
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
        setRedirect(true);
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

  const date = () => {
    const data = new Date();
    const dia = data.getDate();
    const ano = data.getFullYear();
    const month = data.getMonth();
    const hs = data.getHours();
    let saudacao = ''
    if (hs > 5 && hs < 12) {
      saudacao = 'Bom dia!'
    } else if(hs > 12 && hs < 17) {
      saudacao = 'Boa tarde'
    } else {
      saudacao = 'Boa noite'
    }
    return `${dia}/${month}/${ano} - ${saudacao}`;
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
                      <h2>{date()}</h2>
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
