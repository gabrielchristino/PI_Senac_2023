import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const Login = () => {
    const [userName, setuserName] = useState([])
    const [errorMessage, seterrorMessage] = useState([])

    const navigate = useNavigate();
    const navigateToBook = () => {
        navigate('/book');
    };
    const navigateToHome = () => {
        navigate('/home');
    }

    const carregaUsuarios = (event) => {
        event.preventDefault();
        fetch(`http://localhost:3001/usuarios?userName=${userName}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                if (data && data.length > 0) {
                    navigateToBook();
                    seterrorMessage('');
                } else {
                    seterrorMessage('Usuário ou senha inválido');
                }
            })
    }

    return (
        <div>
            <head>
                <meta charSet="UTF-8" />
                <title>Login</title>
            </head>

            <body>
                <h1 id="top-left" onClick={navigateToHome}>Biblioteca inter-escolar</h1>
                <br></br>
                <div class="header-login">
                    <h1>Gestor de Livros</h1>
                </div>
                <form id="login-form" method="post">
                    <label for="username">Usuário(a):</label>
                    <input type="text" id="username" name="username" onChange={(e) => setuserName(e.target.value)} value={userName} />

                    <label for="password">Senha:</label>
                    <input type="password" id="password" name="password" />

                    {errorMessage && (
                        <p>{errorMessage}</p>
                    )}

                    <input type="submit" value="Entrar" onClick={carregaUsuarios} />
                    <input type="button" value="Ainda não sou cadastrado(a)" id="register" />
                </form>
                <footer><p>© Biblioteca inter-escolar</p></footer>

            </body>
            <Outlet />
        </div>
    );
}

export default Login;