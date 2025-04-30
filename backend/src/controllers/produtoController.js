const pool = require('../config/database');
const { validationResult } = require('express-validator');

exports.criarProduto = async (req, res, next) => {
    const erros = validationResult(req);
    if(!erros.isEmpty()) {
        return res.status(400).json({erros: erros.array()});
    }

    const {nome, descricao, preco, estoque} = req.body;

    try {
        const result = await pool.query(
          `INSERT INTO produtos.produtos (nome, descricao, preco, estoque, datacriacao) VALUES($1, $2, $3, $4, NOW()) RETURNING *`, [nome, descricao, preco, estoque]  
        );
        res.status(200).json(result.rows[0]);
    } catch(error) {
        next(error);
    } 
}

exports.listarProduto = async (req,res,next) => {
    try {
        const result = await pool.query (`SELECT * FROM produtos.produtos`)
        res.status(200).json(result.rows)
    } catch(error) {
        next(error);
    }
}

exports.deletarProduto = async (req, res, next) => {
    try {
        const { produto_idkey } = req.params;

        if (!produto_idkey || isNaN(produto_idkey)) {
            return res.status(400).json({ erro: 'ID de usuário inválido' });
        }

        const result = await pool.query(
            `DELETE FROM produtos.produtos WHERE idkey = $1 RETURNING *`, 
            [produto_idkey]
        );

        return result.rowCount === 0
        ? res.status(404).json({ erro: `Produto com ID ${produto_idkey} não foi encontrado` })
        : res.status(200).json({ msg: 'Produto deletado com sucesso', produto: result.rows[0] });
        
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        next(error);
    }
};
