const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

// Ao receber conexão
io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    })
});

// Conecta ao MongoDB Atlas
mongoose.connect('mongodb+srv://boxdev:boxdev@cluster0-crzfp.mongodb.net/boxdev?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});

app.use((req, res, next) => {
    req.io = io;
    return next();
});

// Ajuda o servidor a entender requisições JSON
app.use(express.json());

// Permite que nós enviemos arquivos
app.use(express.urlencoded({extended: true}));

// Rotas
app.use(require('./routes'));

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

// Inicia o servidor
server.listen(3333, function() {
    console.log('Servidor iniciado.');
});