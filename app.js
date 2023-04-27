
const express = require('express') // importa o express
const app = express()
const cors = require('cors');
const port = 3001 // porta utilizada
var livros = require('./livros');
var usuarios = require('./usuarios');

app.use(express.json());

app.use((req, res, next) => {
  //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
  res.header("Access-Control-Allow-Origin", "*");
  //Quais são os métodos que a conexão pode realizar na API
  res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", 'content-type');
  res.header("content-type", 'application/json');
  app.use(cors());
  next();
});

app.use('/livros', livros);
app.use('/usuarios', usuarios);

app.listen(port, () => {
  console.log(`API livros na porta ${port}`)
})
