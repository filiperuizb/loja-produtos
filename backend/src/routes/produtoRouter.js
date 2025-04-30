const express = require('express');
const router = express.Router();
const { criarProduto, listarProduto, deletarProduto } = require('../controllers/produtoController');
const { validarProduto } = require('../middleware/validacaoProduto');

router.post('/', validarProduto, criarProduto);
router.get('/', listarProduto);
router.delete('/:produto_idkey', deletarProduto);

module.exports = router;