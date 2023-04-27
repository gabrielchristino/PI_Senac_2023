
var express = require('express');
var fs = require('fs')
var router = express.Router();

var data = require('./usuarios.json')

router.get('/', function (req, res) {
    data = fs.readFileSync('./usuarios.json');
    var myObject = JSON.parse(data);
    const lista = myObject;
    const id = req.query.id;
    const name = req.query.name;
    const userName = req.query.userName;
    const school = req.query.school;
    const profile = req.query.profile;

    let novaLista = lista;
    if (id || name || userName || school || profile) {
        novaLista = lista.filter(livro => {
            return livro.id == id ||
                String(livro.name).includes(name) ||
                String(livro.userName) == (userName) ||
                String(livro.school).includes(school) ||
                String(livro.profile).includes(profile)
        })
    }

    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(novaLista));
});

router.put('/:datahora', function (req, res) {
    console.log('req', req.body);

    var data = fs.readFileSync('./usuarios.json');
    var myObject = JSON.parse(data);
    myObject.push({ id: req.params.datahora, ...req.body });

    var newData = JSON.stringify(myObject);
    fs.writeFile('./usuarios.json', newData, err => {
        // error checking
        if (err) throw err;

        data = fs.readFileSync('./usuarios.json');
        myObject = JSON.parse(data);

        res.header("Content-Type", 'application/json');
        res.statusCode = "201";
        res.send(JSON.stringify({}));
    });
});

module.exports = router;