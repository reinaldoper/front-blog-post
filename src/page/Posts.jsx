import { useEffect, useState } from "react";
import { Post } from "../service/fetch";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const [user, setUser] = useState([]);
  const [msg, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const options = {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      }
    }
    const result = async () => {
      const { message, error } = await Post(options, 'post/published');
      if (error) {
        setMessage(error);
      } if (message) {
        setUser(message);
      }
    }
    result();
  }, []);

  const formatDate = (dateString) => {
    const data = new Date(dateString);
    const dia = String(data.getUTCDate()).padStart(2, '0');
    const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
    const ano = data.getUTCFullYear();
    const hora = String(data.getUTCHours()).padStart(2, '0');
    const minuto = String(data.getUTCMinutes()).padStart(2, '0');
    const segundo = String(data.getUTCSeconds()).padStart(2, '0');
    return `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;
  }

  const resultUser = user.map((item) => (
    <ul key={item.id} style={{
      backgroundColor: '#aebfaf',
      color: 'black',
      borderRadius: '5px 0',
      marginBottom: '50px',
    }}>
      <li><h4 style={{backgroundColor: '#aebfaf',}}><em style={{backgroundColor: '#aebfaf',}}>{item.title}</em></h4></li>
      <li><p style={{backgroundColor: '#aebfaf',}}>{item.content}</p></li>
      <li style={{backgroundColor: '#aebfaf',}}>{formatDate(item.created)}</li>
    </ul>
  ));


  const clickHome = () => {
    navigate('/')
  }

  return (
    <div>
      <button
        type="button"
        onClick={clickHome}
        style={{
          display: 'flex',
          cursor: 'pointer',
          width: '100px',
          backgroundColor: 'GrayText',
          padding: '0.5em 0.5em 0.5em',
          borderRadius: '5px',
          marginBottom: '10px',
        }}
      >
        HOME
      </button>
      <h1>All Posts published</h1>
      {user.length > 0 ? <div style={{
        backgroundColor: 'gray',
        width: '30%',
        padding: '10px',
        borderRadius: '10px 0',
        overflowY: 'auto',
      }}>{resultUser}</div> : msg.length > 0 ? <div>{msg}</div> : <h1 style={{
        display: 'flex',
        margin: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
      }}>Carregando</h1>}
    </div>
  )
}

export default Posts;
