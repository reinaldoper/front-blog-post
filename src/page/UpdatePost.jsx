import { useEffect, useState } from "react"
import { User, Post } from "../service/fetch";
import remove from '../assets/update.png';
import { useNavigate } from "react-router-dom";
import formatDate from "../uteis/formateData";

const UpdatePost = () => {
  const [post, setPost] = useState([]);
  const [error, setError] = useState('');
  const [user, setUser] = useState(false);
  const [msg, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
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

  const updatePost = async (id) => {
    const token = localStorage.getItem('token');
    const options = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      }
    }
    const { error, message } = await Post(options, `post/${id}`);
    if (message) {
      setTitle(message.title);
      setContent(message.content);
      setMessage(message);
    } else if (error) {
      setNewUserid(true);
      setNewUser(error);
    }
    result();

  }

  const update = async (id) => {
    const token = localStorage.getItem('token');
    const options = {
      method: "PUT",
      body: JSON.stringify({
        title: title,
        content: content
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      }
    }
    const { error } = await Post(options, `post/${id}`);
    if (error) {
      setNewUserid(true);
      setNewUser(error);
    }
    setMessage('');
    result();

  }


  const published = post.map((post) => (
    <div key={post.id} style={{ display: 'flex', justifyContent: 'center', width: '30vw', marginTop: '0.3em', borderRadius: '10px 0' }}>
      {post.published ? <ol style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', width: '90%', padding: '20px', borderRadius: '10px 0', boxShadow: '5px 5px 10px #063940' }}>
        <li><em style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>published</em></li>
        <li><strong style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>{post.title}</strong></li>
        <li style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>{post.content}</li>
        <li style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>{formatDate(post.created)}</li>
        <li><button type="button" style={{ width: '100%', border: 'none' }} onClick={() => updatePost(post.id)}>
          <img src={remove} alt="remove" style={{ width: '10%' }} />
        </button></li>
        <li>{msg && post.id === msg.id ? <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div>
            <input type="text"
              value={title}
              style={{ display: 'flex', height: '20%', backgroundColor: '#8e8ca3', borderRadius: '5px', width: '100%' }}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button type="button"
              style={{
                display: 'flex',
                height: '15%',
                marginTop: '3%',
                justifyContent: 'center',
                width: '100%', backgroundColor: '#7345d6', borderRadius: '5px'
              }}
              onClick={() => update(post.id)}
            >
              update
            </button>
          </div>
          <textarea style={{ marginLeft: '0.5em', backgroundColor: '#8e8ca3', borderRadius: '5px' }} value={content} cols="15" rows="10" onChange={(e) => setContent(e.target.value)} >
          </textarea>
        </div> : null}</li>
      </ol> : null}
    </div>
  ));

  const notPublished = post.map((post) => (
    <div key={post.id} style={{ display: 'flex', justifyContent: 'center', width: '30vw', marginTop: '0.3em', borderRadius: '10px 0' }}>
      {!post.published ? <ol style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', width: '90%', padding: '20px', borderRadius: '10px 0', boxShadow: '5px 5px 10px #063940' }}>
        <li><em style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>not-published</em></li>
        <li><strong style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>{post.title}</strong></li>
        <li style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>{post.content}</li>
        <li style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>{formatDate(post.created)}</li>
        <li><button type="button" style={{ width: '100%', border: 'none' }} onClick={() => updatePost(post.id)}>
          <img src={remove} alt="remove" style={{ width: '10%' }} />
        </button></li>
        <li>{msg && post.id === msg.id ? <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div>
            <input type="text"
              value={title}
              style={{ display: 'flex', height: '20%', backgroundColor: '#8e8ca3', borderRadius: '5px', width: '100%' }}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button type="button"
              style={{
                display: 'flex',
                height: '15%',
                marginTop: '3%',
                justifyContent: 'center', backgroundColor: '#7345d6', borderRadius: '5px',
                width: '100%'
              }}
              onClick={() => update(post.id)}
            >
              update
            </button>
          </div>
          <textarea style={{ marginLeft: '0.5em', backgroundColor: '#8e8ca3', borderRadius: '5px' }} value={content} cols="15" rows="10" onChange={(e) => setContent(e.target.value)} >
          </textarea>
        </div> : null}</li>
      </ol> : null}
    </div>
  ));

  return (
    <div>
      <h3 style={{
        display: 'flex',
        margin: 'auto',
        justifyContent: 'center',
        color: 'white',
      }}>Update Post</h3>
      <button type="button" onClick={returnPost} style={{
        display: 'flex',
        justifyContent: 'center',
        margin: 'auto',
        marginTop: '5px',
        width: '20%',
        borderRadius: '5px',
        backgroundColor: '#8ebdb6',
        border: 'none',
      }}>posts</button>
      <div style={{ display: 'flex', margin: 'auto', textAlign: 'justify', justifyContent: 'center' }}>
        {user ? <div style={{ display: 'flex', marginTop: '10px', flexDirection: 'column', overflowY: 'scroll', height: '750px', backgroundColor: 'GrayText', borderRadius: '8px' }}>{published}</div> : null}
        {user ? <div style={{ display: 'flex', marginTop: '10px', flexDirection: 'column', overflowY: 'scroll', height: '750px', backgroundColor: 'GrayText', borderRadius: '8px' }}>{notPublished}</div> : null}
      </div>
      {error ? <div style={{ display: 'flex', justifyContent: 'center' }}>{error}</div> : null}
      {newUserid ? <div style={{ display: 'flex', justifyContent: 'center' }}>{newUser}</div> : null}
      {post.length > 0 ? null : <h1 style={{ display: 'flex', justifyContent: 'center', color: 'white' }}>Carregando...</h1>}
    </div>
  )
}

export default UpdatePost
