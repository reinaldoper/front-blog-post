import { useEffect, useState } from "react";
import { Post } from "../service/fetch";
import formatDate from "../uteis/formateData";
import { TbAlignCenter } from "react-icons/tb";
import { CgComment } from "react-icons/cg";
import { FiBellOff } from "react-icons/fi";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import carregando from '../assets/carregando.png';
import NavbarSistem from "../components/Navbar";


const Posts = () => {
  const [user, setUser] = useState([]);
  const [msg, setMessage] = useState('');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [published, setPublished] = useState(false);
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);

  const fechaModal = () => setShow(false);
  const abrirModal = () => setShow(true);


  useEffect(() => {
    renderizaPosts();
  }, []);

  const publish = async () => {
    const token = localStorage.getItem('token');
    const options = {
      method: "POST",
      body: JSON.stringify({
        title: title,
        content: content,
        published: published,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      }
    }
    const { error } = await Post(options, 'post');
    if (error) {
      setError(error);
    } else {
      setTitle('');
      setContent('');
      setPublished(false);
      setError('');
    }
    renderizaPosts();
  };



  const renderizaPosts = async () => {
    const token = localStorage.getItem('token');
    const options = {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      }
    }

    const { message, error } = await Post(options, 'post/published');
    if (error) {
      setMessage(error);
    } if (message) {
      setUser(message);
    }
  };



  const resultUser = user.map((item) => (
    
      <div className="card" style={{width: '43vw'}} key={item.id} data-aos="flip-left">
        <div className="card-body">
          <h5 className="card-title">{item.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{formatDate(item.created)}</h6>
          <p className="card-text">{item.content}</p>
        </div>
      </div>
    
  ));


  return (
    <div>
      <h5 className="card-title"><NavbarSistem /></h5>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        textAlign: 'center',
        justifyContent: 'center',
        margin: 'auto',
        alignItems: 'center',
      }}>

        <hr style={{ width: '80%', margin: 'auto', marginTop: '10px', color: 'white' }} />
        <div style={{ display: "flex" }} className="blogs">
          {user.length > 0 ? <div className="results"
            data-aos="zoom-in-down"
            style={{
              backgroundColor: '#6e9987',
              width: '45vw',
              height: '700px',
              padding: '10px',
              borderRadius: '10px 0',
              overflowY: 'scroll',
              marginLeft: '0.5em',
              marginTop: '0.5em',
            }}>{resultUser}</div> : msg.length > 0 ? <div>{msg}</div> : <h1 style={{
              display: 'flex',
              margin: 'auto',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
            }}><img className="reading" src={carregando} alt="carregando" /></h1>}
          <div style={{ marginTop: '8px' }}>
            <details style={{ marginLeft: '30px', fontSize: '25px' }}>
              <summary>  Comment<CgComment /></summary>
              {user.length > 0 ?
                <>
                  <Button variant="primary" onClick={abrirModal} style={{ marginTop: '0.5em' }}>
                    Open more details for comment
                  </Button>

                  <Modal show={show} onHide={fechaModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Do your comment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <fieldset style={{
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'center',
                        justifyContent: 'center',
                        border: 'none',
                        padding: '0.5em',
                        borderRadius: '5px',
                        backgroundColor: '#6e9987',
                        width: '100%',
                      }}>
                        <legend style={{ backgroundColor: '#6e9987', display: 'flex', justifyContent: 'center' }}><TbAlignCenter /></legend>
                        <input type="text"
                          value={title}
                          placeholder="title"
                          onChange={(e) => setTitle(e.target.value)}
                          style={{
                            marginBottom: '0.5em',
                            border: '1px solid #3d423c',
                            backgroundColor: '#b2b39f',
                            borderRadius: '5px',
                            height: '30px',
                            textAlign: 'justify',
                          }}
                        />
                        <textarea value={content} cols="30" rows="10"
                          placeholder="What are you thinking:"
                          onChange={(e) => setContent(e.target.value)}
                          style={{ display: 'flex', backgroundColor: '#b2b39f', }}
                        >

                        </textarea>
                        <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#6e9987', flexWrap: 'wrap' }}>
                          <input
                            type="checkbox"
                            value={published}
                            onClick={(e) => setPublished(e.target.checked)}
                            style={{ border: 'none', backgroundColor: '#dedfc5' }}
                          />
                          <label htmlFor="" style={{ display: 'flex', marginLeft: '10px', backgroundColor: '#6e9987' }}>published</label>
                        </div>
                        <Button variant="primary"
                          onClick={publish}
                        >create</Button>
                        {error.length > 0 ? <h4 style={{ backgroundColor: '#6e9987' }}>{error}</h4> : null}
                      </fieldset>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={fechaModal}>
                        Button close
                      </Button>
                      <Button variant="primary" onClick={fechaModal}>
                        Button close view
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
                : null}
            </details>
            <hr style={{ color: 'white' }} />
            <details style={{ marginLeft: '0', fontSize: '25px' }}>
              <summary>  Regras<FiBellOff /></summary>
              <p style={{ marginLeft: '10px', color: 'white' }}>Todo e qualquer comentário <br /> ofencivo será excluido.</p>
            </details>
            <hr style={{ color: 'white' }} />
            <details style={{ marginLeft: '0px', fontSize: '25px' }}>
              <summary style={{ marginLeft: '20px', fontSize: '25px' }} className="discriminacao">Proibido<FiBellOff /></summary>
              <p style={{ marginLeft: '10px', color: 'white' }}>Comentários <br /> racistas serão excluidos.</p>
            </details>

          </div>
        </div>
      </div>
      <h2 style={{ display: 'flex', justifyContent: 'center', margin: 'auto', marginTop: '10px', color: 'white', width: '50%', }}>All rights reserved &reg;</h2>
    </div>

  )
}

export default Posts;
