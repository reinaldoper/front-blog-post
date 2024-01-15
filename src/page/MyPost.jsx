import { useEffect, useState } from "react"
import { User, Post } from "../service/fetch";
import formatDate from "../uteis/formateData";
import carregando from '../assets/carregando.png';
import NavbarSistem from "../components/Navbar";
import { Button } from "react-bootstrap";

const MyPost = () => {
  const [post, setPost] = useState([]);
  const [error, setError] = useState('');
  const [user, setUser] = useState(false);
  const [msg, setMessage] = useState('');
  const [userid, setUserid] = useState(false);
  const [newUser, setNewUser] = useState('');
  const [newUserid, setNewUserid] = useState(false);


  useEffect(() => {
    result();
  }, []);

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
    <div data-aos="flip-left" key={post.id} style={{ display: 'flex', justifyContent: 'center', width: '30vw', marginTop: '0.3em', borderRadius: '10px 0' }}>
      {post.published ? <div className="card" style={{ width: '40vw' }}>
        <div className="card-body">
          <h6 className="card-subtitle mb-2 text-muted">published</h6>
          <h5 className="card-title">{post.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{formatDate(post.created)}</h6>
          <p className="card-text">{post.content}</p>
          <Button onClick={() => removePost(post.id)} className="btn btn-primary">Remove</Button>
        </div>
      </div> : null}
    </div>
  ));
  
  const verify = post.some(i => {
    if(!i.published){
      return true;
    }
  });
  

  

  const notPublished = post.map((post) => (
    <div data-aos="flip-left" key={post.id} style={{ display: 'flex', justifyContent: 'center', width: '30vw', marginTop: '0.3em', borderRadius: '10px 0' }}>
      {!post.published ? <div className="card" style={{ width: '40vw' }}>
        <div className="card-body">
          <h6 className="card-subtitle mb-2 text-muted">not-published</h6>
          <h5 className="card-title">{post.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{formatDate(post.created)}</h6>
          <p className="card-text">{post.content}</p>
          <Button onClick={() => removePost(post.id)} className="btn btn-primary">Remove</Button>
        </div>
      </div> : null}
    </div>
  ));

  return (
    <div>
      <h5 className="card-title"><NavbarSistem /></h5>
      <h3 style={{
        display: 'flex',
        margin: 'auto',
        justifyContent: 'center',
        color: 'white',
      }}>Post published    |    Post not-published</h3>

      <hr style={{ width: '80%', margin: 'auto', marginTop: '10px', color: 'white' }} />
      {user ? <>{post.length > 0 ? <div style={{ display: 'flex', margin: 'auto', textAlign: 'justify', justifyContent: 'center' }}>
        {user ? <div style={{ display: 'flex', marginTop: '10px', flexDirection: 'column', overflowY: 'scroll', height: '750px', backgroundColor: 'GrayText', borderRadius: '8px' }}>{published}</div> : null}
        {user && verify ? <div style={{ display: 'flex', marginTop: '10px', flexDirection: 'column', overflowY: 'scroll', height: '750px', backgroundColor: 'GrayText', borderRadius: '8px' }}>{notPublished}</div> : null}
      </div> : <h1 style={{ display: 'flex', color: 'white', justifyContent: 'center', marginTop: '10%' }}>You not have post published.</h1>}</> : <h1 style={{ display: 'flex', justifyContent: 'center', color: 'white' }}>
        <img className="reading" src={carregando} alt="carregando" />
      </h1>}
      {error ? <div style={{ display: 'flex', justifyContent: 'center' }}>{error}</div> : null}
      {userid ? <div style={{ display: 'flex', justifyContent: 'center' }}>{msg}</div> : null}
      {newUserid ? <div style={{ display: 'flex', justifyContent: 'center' }}>{newUser}</div> : null}
    </div>
  )
}

export default MyPost;
