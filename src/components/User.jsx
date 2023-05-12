import React, { useEffect, useState } from "react";
import { Outlet } from 'react-router-dom';

const User = () => {
  // Dados dos usuarios
  const [users, setusers] = useState([])
  const [name, setname] = useState([])
  const [username, setusername] = useState([])
  const [school, setschool] = useState([])
  const [profile, setprofile] = useState([])

  // Chama API que traz os usuarios
  const carregaUsuarios = () => {
    fetch("http://localhost:3001/usuarios")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setusers(data);
      })
  }


  // Chama API que adiciona usuarios
  const adicionaUsuario = (event) => {
    event.preventDefault();

    fetch('http://localhost:3001/usuarios/' + Date.now(), {
      method: 'PUT',
      body: JSON.stringify({ name, school, profile }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        carregaUsuarios();
        handleCloseModal();
      })
  }

  useEffect(() => {
    carregaUsuarios();
  }, [])

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  const handleModalClick = (event) => {
    if (event.target === event.currentTarget) {
      setShowModal(false);
    }
  };

  return (
    
    <div>
      <head>
        <meta charSet="UTF-8" />
        <title>Gerenciar Usuários</title>
      </head>

      <body>
        <div>
          <nav className="top-nav">
            <div><a href="./book"><h1>Biblioteca inter-escolar</h1></a></div>
            <ul>
              <li><a href="./book">Livros</a></li>
              <li><a href="./user">Usuários</a></li>
              <li><a href="./">Sair</a></li>
            </ul>
          </nav>
        </div>
        <h1>Gerenciar Usuário</h1>
        <div className="header">
          <div className="action">
            <button onClick={handleOpenModal} id="abrir-modal">Adicionar Usuario</button>
          </div>
        </div>
        {showModal && (
          <div className="modal" onClick={handleModalClick}>
            <div className="modal-content">
              <span className="fechar-modal" onClick={handleCloseModal}>
                &times;
              </span>
              <form id="book-form" method="post" onSubmit={adicionaUsuario}>
                <label htmlFor="name">Nome do usuario:</label>
                <input type="text" id="name" name="name" onChange={(e) => setname(e.target.value)} value={name} />

                <label htmlFor="username">Nome de usuário de acesso:</label>
                <input type="text" id="username" username="username" onChange={(e) => setusername(e.target.value)} value={username} />

                <label htmlFor="school">Escola:</label>
                <input type="text" id="school" name="school" onChange={(e) => setschool(e.target.value)} value={school} />

                <label htmlFor="profile">Perfil de acesso:</label>
                <select name="profile" id="profile" onChange={(e) => setprofile(e.target.value)} value={profile}>
                  <option value="Aluno">Aluno</option>
                  <option value="Professor">Professor</option>
                  <option value="ResponsavelAluno">Responsavel pelo aluno</option>
                  <option value="Administrador">Administrador</option>
                </select>

                <input type="submit" value="Cadastrar usuários" />
              </form>
            </div>
          </div>
        )}

        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Escola</th>
              <th>Perfil</th>
            </tr>
          </thead>
          <tbody id="users">
            {users.length > 0 && (
              <>
                {users.map(book => (
                  <tr>
                    <td>{book.name}</td>
                    <td>{book.school}</td>
                    <td>{book.profile}</td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
        <footer><p>© Biblioteca inter-escolar</p></footer>
      </body>
      <Outlet />
    </div>
  );

}

export default User;