const express = require('express');
const router = express.Router();
const { registrarCompra, listarCompra } = require('../controllers/compraController');

router.post('/', registrarCompra);
router.get('/', listarCompra);
module.exports = router;