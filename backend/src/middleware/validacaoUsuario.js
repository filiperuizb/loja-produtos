const { body } = require('express-validator');

exports.validarProduto = [
    body('nome').notEmpty().withMessage('O nome do usuario é obrigatório'),
    body('cpf').notEmpty().withMessage('O CPF é obrigatório'),
    body('email').isEmail().withMessage('EMAIL Inválido!'),
    body('senha').isLength({min : 8}).withMessage('A senha tem que ter no mínimo 8 caracteres!')
]