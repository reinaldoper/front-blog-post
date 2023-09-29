import { useEffect, useState } from "react"
import { User, Post } from "../service/fetch";
import remove from '../assets/update.png';
import { useNavigate } from "react-router-dom";
import formatDate from "../uteis/formateData";
import { CgComment } from "react-icons/cg";
import { ImHome2 } from "react-icons/im";
import { AiFillCheckSquare } from "react-icons/ai";
import carregando from '../assets/carregando.png';

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
        <CgComment />
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
              style={{ display: 'flex', height: '5vh', backgroundColor: '#8e8ca3', borderRadius: '5px', width: '100%' }}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button type="button"
              style={{
                display: 'flex',
                height: '5vh',
                marginTop: '3%',
                marginBottom: '3%',
                justifyContent: 'center',
                padding: '10px',
                width: '100%', backgroundColor: '#7345d6', borderRadius: '5px'
              }}
              onClick={() => update(post.id)}
            >
              <AiFillCheckSquare />
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
        <CgComment />
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
              style={{ display: 'flex', height: '5vh', backgroundColor: '#8e8ca3', borderRadius: '5px', width: '100%' }}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button type="button"
              style={{
                display: 'flex',
                marginTop: '3%',
                marginBottom: '3%',
                padding: '10px',
                height: '5vh',
                justifyContent: 'center', backgroundColor: '#7345d6', borderRadius: '5px',
                width: '100%'
              }}
              onClick={() => update(post.id)}
            >
              <AiFillCheckSquare />
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
      <hr style={{ width: '80%', margin: 'auto', marginTop: '10px', color: 'white' }} />
      <button type="button" onClick={returnPost} style={{
        display: 'flex',
        justifyContent: 'center',
        margin: 'auto',
        marginTop: '5px',
        width: '20%',
        borderRadius: '5px',
        backgroundColor: '#8ebdb6',
        border: 'none',
        padding: '10px',
        height: '2.4em',
      }}><ImHome2 /></button>
      <hr style={{ width: '80%', margin: 'auto', marginTop: '10px', color: 'white' }} />
      {user ? <>{post.length > 0 ? <div style={{ display: 'flex', margin: 'auto', textAlign: 'justify', justifyContent: 'center' }}>
        {user ? <div style={{ display: 'flex', marginTop: '10px', flexDirection: 'column', overflowY: 'scroll', height: '750px', backgroundColor: 'GrayText', borderRadius: '8px' }}>{published}</div> : null}
        {user ? <div style={{ display: 'flex', marginTop: '10px', flexDirection: 'column', overflowY: 'scroll', height: '750px', backgroundColor: 'GrayText', borderRadius: '8px' }}>{notPublished}</div> : null}
      </div> : <h1 style={{ display: 'flex', color: 'white', justifyContent: 'center', marginTop: '10%' }}>You not have post published.</h1>}</> : <h1 style={{ display: 'flex', justifyContent: 'center', color: 'white' }}>
        <img src={carregando} alt="carregando" />
        </h1>}
      {error ? <div style={{ display: 'flex', justifyContent: 'center' }}>{error}</div> : null}
      {newUserid ? <div style={{ display: 'flex', justifyContent: 'center' }}>{newUser}</div> : null}
    </div>
  )
}

export default UpdatePost
