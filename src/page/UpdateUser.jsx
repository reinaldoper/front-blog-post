import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../service/fetch";
import login from '../assets/login.png';

const UpdateUser = () => {
  const [name, setEmail] = useState('');
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
      setEmail('');
    } else if (message) {
      setMessage('');
      setEmail('');
      navigate('/');
    }
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
        <h1 style={{ backgroundColor: 'GrayText', }}><strong><em style={{ backgroundColor: 'GrayText', }}>Update User</em></strong></h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setEmail(e.target.value)}
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
        <button
          type="button"
          onClick={update}
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
          Update
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
        {msg.length > 0 ? <h2 style={{
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

export default UpdateUser;
