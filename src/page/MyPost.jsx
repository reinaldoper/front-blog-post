import { useEffect, useState } from "react"
import { User, Post } from "../service/fetch";
import remove from '../assets/remove.png';
import { useNavigate } from "react-router-dom";
import formatDate from "../uteis/formateData";
import { CgComment } from "react-icons/cg";
import { ImHome2 } from "react-icons/im";

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


  const published = post.map((post) => (
    <div key={post.id} style={{ display: 'flex', justifyContent: 'center', width: '30vw', marginTop: '0.3em', borderRadius: '10px 0' }}>
      {post.published ? <ol style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', width: '90%', padding: '20px', borderRadius: '10px 0', boxShadow: '5px 5px 10px #063940' }}>
        <CgComment />
        <li><em style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>published</em></li>
        <li><strong style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>{post.title}</strong></li>
        <li style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>{post.content}</li>
        <li style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>{formatDate(post.created)}</li>
        <li><button type="button" style={{ width: '100%', border: 'none' }} onClick={() => removePost(post.id)}>
          <img src={remove} alt="remove" style={{ width: '10%' }} />
        </button></li>
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
        color: 'white',
      }}>Post published    |    Post not-published</h3>
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
      }}><ImHome2 /></button>
      <hr style={{ width: '80%', margin: 'auto', marginTop: '10px', color: 'white' }} />
      {user ? <>{post.length > 0 ? <div style={{ display: 'flex', margin: 'auto', textAlign: 'justify', justifyContent: 'center' }}>
        {user ? <div style={{ display: 'flex', marginTop: '10px', flexDirection: 'column', overflowY: 'scroll', height: '750px', backgroundColor: 'GrayText', borderRadius: '8px' }}>{published}</div> : null}
        {user ? <div style={{ display: 'flex', marginTop: '10px', flexDirection: 'column', overflowY: 'scroll', height: '750px', backgroundColor: 'GrayText', borderRadius: '8px' }}>{notPublished}</div> : null}
      </div> : <h1 style={{ display: 'flex', color: 'white', justifyContent: 'center', marginTop: '10%' }}>You not have post published.</h1>}</> : <h1 style={{ display: 'flex', justifyContent: 'center', color: 'white' }}>Carregando...</h1>}
      {error ? <div style={{ display: 'flex', justifyContent: 'center' }}>{error}</div> : null}
      {userid ? <div style={{ display: 'flex', justifyContent: 'center' }}>{msg}</div> : null}
      {newUserid ? <div style={{ display: 'flex', justifyContent: 'center' }}>{newUser}</div> : null}
    </div>
  )
}

export default MyPost
