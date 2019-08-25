const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();

// Controllers
const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');

// Rota para criação de Boxs
routes.post('/boxes', BoxController.store);

// Rota para exibir Boxs
routes.get('/boxes/:id', BoxController.show);

// Rota para entrada de arquivos
routes.post(
    '/boxes/:id/files',
    multer(multerConfig).single('file'),
    FileController.store
);

module.exports = routes;