import { useEffect, useState } from "react";
import { User, Post } from "../service/fetch";
import { CgComment } from "react-icons/cg";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import carregando from '../assets/carregando.png';
import remove from '../assets/update.png';
import NavbarSistem from "../components/Navbar";
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
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);

  useEffect(() => {
    result();
  }, []);

  const result = async () => {
    try {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('email');
      const options = {
        method: "PATCH",
        body: JSON.stringify({ email: email }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        }
      };

      const { error, message } = await User(options, 'user/email');

      if (message) {
        setUser(true);
        setPost(message.posts);
      } else if (error) {
        setError(error);
      }
    } catch (error) {
      setError('An error occurred while fetching user posts.');
    }
  }

  const updatePost = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const options = {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        }
      };

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
    } catch (error) {
      setError('An error occurred while fetching post details for update.');
    }
  }

  const update = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const options = {
        method: "PUT",
        body: JSON.stringify({ title: title, content: content }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        }
      };

      const { error } = await Post(options, `post/${id}`);

      if (error) {
        setNewUserid(true);
        setNewUser(error);
      }

      setMessage('');
      result();
      closeModal();
    } catch (error) {
      setNewUserid(true);
      setNewUser('An error occurred while updating the post.');
    }
  }

  const renderPost = (post) => (
    <div key={post.id} style={{ display: 'flex', justifyContent: 'center', width: '30vw', marginTop: '0.3em', borderRadius: '10px 0' }} data-aos="flip-left">
      {post.published ? (
        <ol style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', width: '90%', padding: '20px', borderRadius: '10px 0', boxShadow: '5px 5px 10px #063940' }}>
          <CgComment />
          <li><em style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>published</em></li>
          <li><strong style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>{post.title}</strong></li>
          <li style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>{post.content}</li>
          <li style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>{formatDate(post.created)}</li>
          <li>
            <button type="button" style={{ width: '100%', border: 'none' }} onClick={() => updatePost(post.id)}>
              <img src={remove} alt="remove" style={{ width: '10%' }} />
            </button>
          </li>
          <li>
            {msg && post.id === msg.id ? (
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Button variant="primary" onClick={openModal} style={{ marginTop: '0.5em' }}>
                  Open more details for update
                </Button>

                <Modal show={showModal} onHide={closeModal}>
                  <Modal.Header closeButton>
                    <Modal.Title>Information change:</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <input
                      type="text"
                      value={title}
                      style={{ display: 'flex', height: '5vh', backgroundColor: '#8e8ca3', borderRadius: '5px', width: '100%' }}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                      style={{ backgroundColor: '#8e8ca3', marginTop: '0.5em', width: '100%', borderRadius: '5px' }}
                      value={content}
                      cols="15" rows="10"
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                      Button close
                    </Button>
                    <Button variant="primary" onClick={() => update(post.id)}>
                      Button save
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            ) : null}
          </li>
        </ol>
      ) : null}
    </div>
  );

  const published = post.map(renderPost);
  const notPublished = post.map(renderPost);

  const hasUnpublishedPost = post.some(i => !i.published);

  return (
    <div>
      <h5 className="card-title"><NavbarSistem /></h5>
      <h3 style={{ display: 'flex', margin: 'auto', justifyContent: 'center', color: 'white' }}>Update Post</h3>
      <hr style={{ width: '80%', margin: 'auto', marginTop: '10px', color: 'white' }} />
      {user ? (
        <>
          {post.length > 0 ? (
            <div style={{ display: 'flex', margin: 'auto', textAlign: 'justify', justifyContent: 'center' }}>
              {user ? (
                <div style={{ display: 'flex', marginTop: '10px', flexDirection: 'column', overflowY: 'scroll', height: '750px', backgroundColor: 'GrayText', borderRadius: '8px' }}>
                  {published}
                  {user && hasUnpublishedPost ? (
                    <div style={{ display: 'flex', marginTop: '10px', flexDirection: 'column', overflowY: 'scroll', height: '750px', backgroundColor: 'GrayText', borderRadius: '8px' }}>
                      {notPublished}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : <h1 style={{ display: 'flex', color: 'white', justifyContent: 'center', marginTop: '10%' }}>You do not have a post published.</h1>}
        </>
      ) : <h1 style={{ display: 'flex', justifyContent: 'center', color: 'white' }}>
        <img className="reading" src={carregando} alt="carregando" />
      </h1>}
      {error ? <div style={{ display: 'flex', justifyContent: 'center' }}>{error}</div> : null}
      {newUserid ? <div style={{ display: 'flex', justifyContent: 'center' }}>{newUser}</div> : null}
    </div>
  );
}

export default UpdatePost;
