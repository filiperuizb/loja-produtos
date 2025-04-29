const express = require('express');
const router = express.Router();
const { criarUsuario, listarUsuario, deletarUsuario } = require('../controllers/usuarioController');
const { validarUsuario } = require('../middleware/validacaoUsuario');

router.post('/', validarUsuario, criarUsuario);
router.get('/', listarUsuario);
router.delete('/:usuario_idkey', deletarUsuario);

module.exports = router;