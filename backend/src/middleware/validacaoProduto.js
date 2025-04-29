const { body } = require('express-validator');

exports.validarProduto = [
    body('nome').notEmpty().withMessage('O nome do produto é obrigatório'),
    body('descricao').notEmpty().withMessage('A descrição do produto é obrigatória'),
    body('preco').isFloat({gt:0}).withMessage('O preço tem que ser um valor positivo!'),
    body('estoque').isInt({gt:-1}).withMessage('O estoque não pode ser negativo!')
]