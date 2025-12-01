const express = require('express');
const router = express.Router();
const ClienteController = require('../controllers/ClienteController');

// Definir as rotas para clientes
router.get('/clientes', ClienteController.listAll);
router.post('/clientes/by', ClienteController.listByParam);
router.get('/clientes/:id', ClienteController.getById);
router.post('/clientes', ClienteController.create);
router.put('/clientes/:id', ClienteController.update);
router.delete('/clientes/:id', ClienteController.delete);


module.exports = router;