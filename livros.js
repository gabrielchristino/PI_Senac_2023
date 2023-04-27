
var express = require('express');
var fs = require('fs')
var router = express.Router();

var data = require('./livros.json')

router.get('/', function (req, res) {
    data = fs.readFileSync('./livros.json');
    var myObject = JSON.parse(data);
    const lista = myObject;
    const id = req.query.id;
    const bookName = req.query.bookName;
    const bookPages = req.query.bookPages;
    const school = req.query.school;
    const library = req.query.library;

    let novaLista = lista;
    if (id || bookName || bookPages || school || library) {
        novaLista = lista.filter(livro => {
            return livro.id == id ||
                String(livro.bookName).includes(bookName) ||
                String(livro.bookPages).includes(bookPages) ||
                String(livro.school).includes(school) ||
                String(livro.library).includes(library)
        })
    }

    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(novaLista));
});

router.put('/:datahora', function (req, res) {
    console.log('req', req.body);

    var data = fs.readFileSync('./livros.json');
    var myObject = JSON.parse(data);
    myObject.push({ id: req.params.datahora, ...req.body });

    var newData = JSON.stringify(myObject);
    fs.writeFile('./livros.json', newData, err => {
        // error checking
        if (err) throw err;

        data = fs.readFileSync('./livros.json');
        myObject = JSON.parse(data);

        res.header("Content-Type", 'application/json');
        res.statusCode = "201";
        res.send(JSON.stringify({}));
    });
});

module.exports = router;