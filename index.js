const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParse = require('body-parser');


app.use(morgan('dev'));
app.use(bodyParse.urlencoded({ extended: false}));
app.use(bodyParse.json());

const routeUsuario = require('./src/routes/usuario')
const routeTarefas = require('./src/routes/tarefas')

app.use('/usuario', routeUsuario);
app.use('/tarefas', routeTarefas);

module.exports = app;