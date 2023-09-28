import { useEffect, useState } from "react";
import { Post } from "../service/fetch";
import { useNavigate } from "react-router-dom";
import botao from '../assets/download.jpeg'
import botaoUpdate from '../assets/update.png';
import click from '../assets/delete.png';
import formatDate from "../uteis/formateData";
import { TbAlignCenter } from "react-icons/tb";
import { CgComment } from "react-icons/cg";
import { FiBellOff } from "react-icons/fi";


const Posts = () => {
  const [user, setUser] = useState([]);
  const [msg, setMessage] = useState('');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [published, setPublished] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
    <ul key={item.id} style={{
      backgroundColor: '#aebfaf',
      color: 'black',
      borderRadius: '5px 0',
      marginBottom: '50px',
      overflowY: 'auto',
      boxShadow: '5px 5px 10px #063940'
    }}>
      <CgComment />
      <li><h4 style={{ backgroundColor: '#aebfaf', }}><em style={{ backgroundColor: '#aebfaf', }}>{item.title}</em></h4></li>
      <li><p style={{ backgroundColor: '#aebfaf', }}>{item.content}</p></li>
      <li style={{ backgroundColor: '#aebfaf', }}>{formatDate(item.created)}</li>
    </ul>
  ));


  const clickHome = () => {
    navigate('/')
  }

  const clickUpdate = () => {
    navigate('/update')
  }

  const clickMyPost = () => {
    navigate('/my-post')
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      textAlign: 'center',
      justifyContent: 'center',
      margin: 'auto',
      alignItems: 'center',
    }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <button
          type="button"
          onClick={clickHome}
          style={{ border: 'none', borderRadius: '5px', marginTop: '0.5em', marginLeft: '3em' }}
        >
          <img
            src={botao}
            alt="botão"
            style={{
              display: 'flex',
              cursor: 'pointer',
              width: '100px',
              borderRadius: '5px',
              marginBottom: '10px',
              marginTop: '0.5em',
              outline: '0px auto -webkit-focus-ring-color',
              outlineOffset: '0px',
            }}
          />
        </button>
        <button
          type="button"
          onClick={clickUpdate}
          style={{ border: 'none', borderRadius: '5px', marginTop: '0.5em', marginLeft: '3em' }}
        >
          <img
            src={botaoUpdate}
            alt="botão"
            style={{
              display: 'flex',
              cursor: 'pointer',
              width: '90px',
              height: '50px',
              borderRadius: '5px',
              marginBottom: '10px',
              marginTop: '0.4em',
              outline: '0px auto -webkit-focus-ring-color',
              outlineOffset: '0px',
            }}
          />
        </button>
        <button
          type="button"
          onClick={clickMyPost}
          style={{ border: 'none', borderRadius: '5px', marginTop: '0.5em', marginLeft: '3em' }}
        >
          <img
            src={click}
            alt="botão"
            style={{
              display: 'flex',
              cursor: 'pointer',
              width: '90px',
              height: '50px',
              borderRadius: '5px',
              marginBottom: '10px',
              marginTop: '0.4em',
              outline: '0px auto -webkit-focus-ring-color',
              outlineOffset: '0px',
            }}
          />
        </button>
      </div>
      <hr style={{ width: '80%', margin: 'auto', marginTop: '10px', color: 'white' }} />
      <h1 className="all" style={{
        display: 'flex', marginLeft: '0.5em',
        marginTop: '0.5em',
        color: 'white',
      }}>All Posts published</h1>
      <hr style={{ width: '80%', margin: 'auto', marginTop: '10px', color: 'white' }} />
      <div style={{ display: "flex" }} className="blogs">
        {user.length > 0 ? <div className="results"
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
          }}>Carregando...</h1>}
        <div style={{ marginTop: '8px' }}>
          <details style={{ marginLeft: '30px', fontSize: '25px' }}>
            <summary>  Comment<CgComment /></summary>
            {user.length > 0 ? <fieldset style={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
              justifyContent: 'center',
              marginLeft: '0.5em',
              border: '1px solid gray',
              padding: '0.5em',
              borderRadius: '5px',
              backgroundColor: '#6e9987',
              width: '20vw',
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
              <button type="button"
                onClick={publish}
                style={{
                  backgroundColor: '#114d4d',
                  color: 'white',
                  borderRadius: '5px',
                }}>create</button>
              {error.length > 0 ? <h4 style={{ backgroundColor: '#6e9987' }}>{error}</h4> : null}
            </fieldset> : null}
          </details>
          <hr style={{ color: 'white' }} />
          <details style={{ marginLeft: '0', fontSize: '25px' }}>
            <summary>  Regras<FiBellOff /></summary>
            <p style={{ marginLeft: '10px' }}>Todo e qualquer comentário <br /> ofencivo será excluido.</p>
          </details>
          <hr style={{ color: 'white' }} />
          <details style={{ marginLeft: '0px', fontSize: '25px' }}>
            <summary style={{ marginLeft: '20px', fontSize: '25px' }} className="discriminacao">Proibido<FiBellOff /></summary>
            <p style={{ marginLeft: '10px' }}>Comentários <br /> racistas serão excluidos.</p>
          </details>

        </div>
      </div>
    </div>
  )
}

export default Posts;
