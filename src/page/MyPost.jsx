import { useEffect, useState } from "react"
import { User, Post } from "../service/fetch";
import remove from '../assets/remove.png';
import { useNavigate } from "react-router-dom";

const MyPost = () => {
  const [post, setPost] = useState([]);
  const [error, setError] = useState('');
  const [user, setUser] = useState(false);
  const [msg, setMessage] = useState('');
  const [userid, setUserid] = useState(false);
  const [newUser, setNewUser] = useState('');
  const [newUserid, setNewUserid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    result();
  }, []);

  const returnPost = () => {
    navigate('/posts');
  }

  const result = async () => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const options = {
      method: "PATCH",
      body: JSON.stringify({
        email: email,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      }
    }
    const { error, message } = await User(options, 'user/email');
    if (message) {
      setUser(true);
      setPost(message.posts);
    } else if (error) {
      setError(error);
    }
  }

  const removePost = async (id) => {
    const token = localStorage.getItem('token');
    const options = {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      }
    }
    const { error, message } = await Post(options, `post/${id}`);
    if (message) {
      setUserid(true);
      setMessage(message);
    } else if (error) {
      setNewUserid(true);
      setNewUser(error);
    }
    result();

  }

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

  const published = post.map((post) => (
    <div key={post.id} style={{ display: 'flex', width: '90%', marginTop: '7px', borderRadius: '10px 0' }}>
      {post.published ? <ol style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', width: '90%', padding: '20px', borderRadius: '10px 0' }}>
        <li style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>{post.title}</li>
        <li style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>{post.content}</li>
        <li style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>{formatDate(post.created)}</li>
        <li><button type="button" style={{ width: '100%', border: 'none' }} onClick={() => removePost(post.id)}>
          <img src={remove} alt="remove" style={{ width: '10%' }} />
        </button></li>
      </ol> : null}
    </div>
  ));

  const notPublished = post.map((post) => (
    <div key={post.id} style={{ display: 'flex', width: '90%', marginTop: '17px', borderRadius: '10px 0' }}>
      {!post.published ? <ol style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', width: '90%', padding: '20px', borderRadius: '10px 0' }}>
        <li style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>{post.title}</li>
        <li style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>{post.content}</li>
        <li style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>{formatDate(post.created)}</li>
        <li><button type="button" style={{ width: '100%', border: 'none' }} onClick={() => removePost(post.id)}>
          <img src={remove} alt="remove" style={{ width: '10%' }} />
        </button></li>
      </ol> : null}
    </div>
  ));



  return (
    <div>
      <h3 style={{
        display: 'flex',
        margin: 'auto',
        justifyContent: 'center',
      }}>Post published    |    Post not-published</h3>
      <button type="button" onClick={returnPost} style={{
        display: 'flex',
        justifyContent: 'center',
        margin: 'auto',
        marginTop: '5px',
        width: '20%',
        borderRadius: '5px',
        backgroundColor: '#4180ab',
        border: 'none',
      }}>posts</button>
      <div style={{ display: 'flex', margin: 'auto', textAlign: 'justify', justifyContent: 'center' }}>
        {user ? <div>{published}</div> : null}
        {user ? <div>{notPublished}</div> : null}
      </div>
      {error ? <div style={{ display: 'flex', justifyContent: 'center' }}>{error}</div> : null}
      {userid ? <div style={{ display: 'flex', justifyContent: 'center' }}>{msg}</div> : null}
      {newUserid ? <div style={{ display: 'flex', justifyContent: 'center' }}>{newUser}</div> : null}
      {post.length > 0 ? null : <h1 style={{ display: 'flex', justifyContent: 'center' }}>Carregando...</h1>}
    </div>
  )
}

export default MyPost
