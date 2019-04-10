const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require("cors");

//Iniciando Node App criado com Express
const app = express();

//Configuração de quem pode acessar minha API
//(LIBERADO PARA QUALQUER APLICAÇÂO)
app.use(cors());

//Habilitando requisições HTTP e WS - Web Socket's
const server = require("http").Server(app);
const socketIo = require("socket.io")(server);

//Configurando RealTime com Socket.IO
socketIo.on("connection", socket => {
    //Configurando rota dentro do socket para room exclusiva para cada usuário
    socketIo.on('connectionRoom', box => {
        socketIo.join(box);
    })
});

//Utilizando mongoose para conexão com banco de dados Mongo (ATLAS)
mongoose.connect('mongodb+srv://admin:admin@cluster0-uzq3w.mongodb.net/thibasbox?retryWrites=true',
    {
        useNewUrlParser: true
    }
);

//Midleware Global para adcionar informações do Socket.IO para todas as requisições [(req) => (req.io)]
app.use((req, res, next) =>{
    req.io = socketIo;
    //Para terminar de processar requisição
    return next();
})


//Instalação express para rotas NODE.JS
app.use(express.json());
//Express url encoded
app.use(express.urlencoded({ extended: true }));
//path.resolve para buscar arquivos fisicos na pasta "tmp"
app.use('/files', express.static(path.resolve(__dirname, "..", "tmp")));

//Importando arquivo de rotas
app.use(require('./routes'));

//Configuração de porta do servidor NODE.JS
server.listen(3333);
