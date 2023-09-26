import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../service/fetch";
import login from '../assets/login.png';

const Users = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [msg, setMessage] = useState('');

  const navigate = useNavigate();

  const creteUser = async () => {
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
      <img src="https://img.freepik.com/vetores-gratis/blogar-divertido-criacao-de-conteudo-streaming-online-videoblog-jovem-fazendo-selfie-para-rede-social-compartilhando-feedback-estrategia-de-autopromocao-ilustracao-vetorial-de-metafora-de-conceito_335657-855.jpg"
        alt="images"
        style={{
          display: 'flex',
          margin: '0 auto',
          width: '10%',
          height: '8%',
          borderRadius: '20% 0',
          marginTop: '10px',
        }}
      />
      <div style={{
        display: "flex",
        flexDirection: 'column',
        border: '1px solid black',
        padding: '10px',
        width: '30%',
        margin: '0 auto',
        marginTop: '10px',
        backgroundColor: 'GrayText',
        borderRadius: '10px',
      }}>
        <h1 style={{ backgroundColor: 'GrayText', }}><strong><em style={{ backgroundColor: 'GrayText', }}>Create User</em></strong></h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
            margin: '0 auto',
            marginBottom: '10px',
            height: '30px',
            font: 'large',
          }}
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
            margin: '0 auto',
            marginBottom: '10px',
            height: '30px',
            font: 'large',
          }}
        />
        <button
          type="button"
          onClick={creteUser}
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
            margin: '0 auto',
            marginBottom: '10px',
            height: '30px',
            font: 'large',
            textAlign: 'center',
            justifyContent: 'center',
            backgroundColor: 'blueviolet',
            cursor: 'pointer'
          }}
        >
          Create
        </button>
        <Link to='/'
          style={{ backgroundColor: 'GrayText', color: 'black' }}>
          <img src={login}
            alt="login"
            style={{
              display: 'flex',
              cursor: 'pointer',
              width: '100px',
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
        }}>{msg}</h2> : null}
      </div>
      <hr style={{ width: '50%', margin: 'auto', marginTop: '10px' }} />
    </div>
  )
}

export default Users;
