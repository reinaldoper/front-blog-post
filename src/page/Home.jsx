import { useState } from "react"
import { User } from "../service/fetch";
import { useNavigate, Link } from "react-router-dom";
import inscrever from '../assets/inscrever.png';
import blog from '../assets/images.jpeg';
import blogContent from '../assets/blog.jpg';
import updateUser from '../assets/update.png';
import { BiArchiveIn } from "react-icons/bi";
import { CgComment } from "react-icons/cg";
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';

const Home = () => {
  const [msg, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const requeredToken = async () => {
    if (!validarEmail(email)) {
      setMessage('Email is not valid.');
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
        setRedirect(false);
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
      <CgComment style={{
        display: 'flex',
        margin: '0 auto',
        width: '10%',
        height: '8%',
        borderRadius: '20%',
        marginTop: '10px',
        color: 'white',
      }} />
      <div style={{
        display: "flex",
        flexDirection: 'column',
        border: 'none',
        padding: '10px',
        width: '30%',
        margin: '0 auto',
        marginTop: '10px',
        backgroundColor: 'GrayText',
        borderRadius: '10px',
      }}>
        <h1 style={{ backgroundColor: 'GrayText', }}><strong><em style={{ backgroundColor: 'GrayText', }} className="error-user">Login</em></strong></h1>
        <Form.Control size="sm" type="text" value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '80%',
            margin: '0 auto',
            marginBottom: '10px',
            height: '1.5em',
            font: 'large',
            border: 'none',
          }} />
        <Button variant="primary" onClick={requeredToken}
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '80%',
            margin: '0 auto',
            marginBottom: '10px',
            height: '1.5em',
            font: 'large',
            textAlign: 'center',
            justifyContent: 'center',
            backgroundColor: 'blueviolet',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          className="button">
          <BiArchiveIn />
        </Button>
        <Link to='/users' className="img-inscrever" style={{ backgroundColor: 'GrayText', color: 'black' }}>
          <img src={inscrever}
            alt="inscrever"
            style={{
              display: 'flex',
              cursor: 'pointer',
              width: '5em',
              height: '5em',
              borderRadius: '5px',
              marginBottom: '10px',
              marginLeft: '0.5em',
              marginTop: '0.5em',
              outline: '0px auto -webkit-focus-ring-color',
              outlineOffset: '0px',
            }}
          />
        </Link>
        <Link to='/update-user' style={{ backgroundColor: 'GrayText', color: 'black' }}>
          <img src={updateUser}
            alt="updateUser"
            style={{
              display: 'flex',
              cursor: 'pointer',
              width: '5em',
              height: '5em',
              borderRadius: '5px',
              marginBottom: '10px',
              marginLeft: '0.5em',
              marginTop: '0.5em',
              outline: '0px auto -webkit-focus-ring-color',
              outlineOffset: '0px',
            }}
          />
        </Link>
        {msg.length ? <h2 style={{
          display: 'flex',
          flexDirection: 'column',
          width: '50%',
          margin: '0 auto',
          marginBottom: '10px',
          backgroundColor: 'GrayText',
          font: 'large',
          textAlign: 'center',
          justifyContent: 'center'
        }} className="error-user">{msg}</h2> : null}
        {redirect ? <h1 className="error-user" style={{
          display: 'flex',
          flexDirection: 'column',
          width: '50%',
          margin: '0 auto',
          marginBottom: '10px',
          backgroundColor: 'GrayText',
          font: 'large',
          textAlign: 'center',
          justifyContent: 'center'
        }}>Carregando...</h1> : null}
      </div>
      <hr style={{ width: '50%', margin: 'auto', marginTop: '10px', color: 'white' }} />
      <p style={{
        display: 'flex',
        width: '25%',
        margin: 'auto',
        marginTop: '15px',
        justifyContent: 'center',
        alignContent: 'justify',
        fontSize: '20px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'row' }} className="img-blogs">
          <img className="img-0" src={blog} alt="blog" style={{ borderRadius: '20px 0', marginRight: '0.5em' }} />
          <img className="img-1" src={blogContent} alt="blog" style={{ borderRadius: '20px 0', marginLeft: '0.5em' }} />
        </div>
      </p>
      <hr style={{ width: '50%', margin: 'auto', marginTop: '10px', color: 'white' }} />
      <h2 style={{ display: 'flex', justifyContent: 'center', margin: 'auto', marginTop: '10px', color: 'white' }}>All rights reserved &reg;</h2>
    </div>
  )
}

export default Home
