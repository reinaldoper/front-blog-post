import { useState } from "react"
import { User } from "../service/fetch";
import { useNavigate, Link } from "react-router-dom";


const Home = () => {
  const [msg, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const requeredToken = async () => {
    if (!validarEmail(email)) {
      setMessage('Email is not valid.');
      setEmail('');
    } else {
      const options = {
        method: "PATCH",
        body: JSON.stringify({ email: email }),
        headers: {
          'Content-Type': 'application/json',
        }
      }

      const { token, error } = await User(options, 'user/token');
      if (error) {
        setMessage(error);
        setEmail('');
      } else if (token) {
        setMessage('');
        setEmail('');
        localStorage.setItem('token', token);
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
        <h1 style={{ backgroundColor: 'GrayText', }}><strong><em style={{ backgroundColor: 'GrayText', }}>Login</em></strong></h1>
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
          onClick={requeredToken}
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
          Login
        </button>
        <Link to='/users' style={{ backgroundColor: 'GrayText', color: 'black'}}>Create User</Link>
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
      <p style={{
        display: 'flex',
        width: '25%',
        margin: 'auto',
        marginTop: '15px',
        justifyContent: 'center',
        alignContent: 'justify',
        fontFamily: 'sans-serif',
        fontSize: '20px'
      }}>
        <strong style={{textAlign: 'justify'}}>
          Log com usuário para escrever seus pensamentos,
          título do texto descrevendo a idéia principal.
          Em poucas palavras deixe seu comentário, pensamentos etc.
        </strong>

      </p>
      <hr style={{ width: '50%', margin: 'auto', marginTop: '10px' }} />
    </div>
  )
}

export default Home
