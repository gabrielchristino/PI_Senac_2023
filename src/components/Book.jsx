import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const Book = () => {
    // Dados dos livros
    const [books, setBooks] = useState([])
    const [bookName, setbookName] = useState([])
    const [bookPages, setbookPages] = useState([])
    const [school, setschool] = useState([])
    const [library, setlibrary] = useState([])

    // Chama API que traz os livros
    const carregaLivros = () => {
        fetch("http://localhost:3001/livros")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setBooks(data);
            })
    }

    // Chama API que adiciona livro
    const adicionaLivros = (event) => {
        event.preventDefault();

        fetch('http://localhost:3001/livros/' + Date.now(), {
            method: 'PUT',
            body: JSON.stringify({ bookName, bookPages, school, library }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                carregaLivros();
                handleCloseModal();
            })
    }

    useEffect(() => {
        carregaLivros();
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
                <title>Gerenciar Livros</title>
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

                <h1>Gerenciar Livros</h1>
                <div className="header">
                    <div className="action">
                        <button onClick={handleOpenModal} id="abrir-modal">Adicionar livros</button>
                    </div>
                </div>
                {showModal && (
                    <div className="modal" onClick={handleModalClick}>
                        <div className="modal-content">
                            <span className="fechar-modal" onClick={handleCloseModal}>
                                &times;
                            </span>
                            <form id="book-form" method="post" onSubmit={adicionaLivros}>
                                <label htmlFor="bookName">Nome do Livro:</label>
                                <input type="text" id="bookName" name="bookName" onChange={(e) => setbookName(e.target.value)} value={bookName} />

                                <label htmlFor="bookPages">Número de Páginas:</label>
                                <input type="number" id="bookPages" name="bookPages" onChange={(e) => setbookPages(e.target.value)} value={bookPages} />

                                <label htmlFor="school">Escola:</label>
                                <input type="text" id="school" name="school" onChange={(e) => setschool(e.target.value)} value={school} />

                                <label htmlFor="library">Biblioteca:</label>
                                <input type="text" id="library" name="library" onChange={(e) => setlibrary(e.target.value)} value={library} />

                                <input type="submit" value="Cadastrar Livro" />
                            </form>
                        </div>
                    </div>
                )}
                <table>
                    <thead>
                        <tr>
                            <th>Nome do Livro</th>
                            <th>Número de Páginas</th>
                            <th>Escola</th>
                            <th>Localização</th>
                        </tr>
                    </thead>
                    <tbody id="books">
                        {books.length > 0 && (
                            <>
                                {books.map(book => (
                                    <tr>
                                        <td>{book.bookName}</td>
                                        <td>{book.bookPages}</td>
                                        <td>{book.school}</td>
                                        <td>{book.library}</td>
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

export default Book;
