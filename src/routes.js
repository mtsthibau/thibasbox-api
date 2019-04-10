const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');
const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');

//Importando router do express
const routes = express.Router();

//Instanciando rotas dos serviços.
routes.post('/storeBoxe', BoxController.store);
routes.post('/boxes/:id/storeFile', multer(multerConfig).single("file"), FileController.store);
routes.get('/showBox/:id', BoxController.showBox);

//Exportando arquivo routes
module.exports = routes;