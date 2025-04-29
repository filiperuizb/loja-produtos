const pool = require('../config/database');
const { hashSenha } = require('../utils/hash');
const { validationResult } = require('express-validator');

exports.criarUsuario = async (req, res, next) => {
    const erros = validationResult(req);
    if(!erros.isEmpty()) {
        return res.status(400).json({erros: erros.array()});
    }

    const { nome, cpf, email, senha} = req.body;
    try {
        const senhaCripto = await hashSenha(senha);
        const result = await pool.query (
            `INSERT INTO usuario.usuario (nome, cpf, email, senha, datacriacao) VALUES($1, $2, $3, $4, NOW()) RETURNING *`, [nome, cpf, email, senhaCripto]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

exports.listarUsuario = async(req, res, next) => {
    try {
        const result = await pool.query (
            `SELECT * FROM usuario.usuario`
        )
        res.status(200).json(result.rows);
    } catch(error) {
        next(error);
    }
}

exports.deletarUsuario = async (req, res, next) => {
    try {
        const { usuario_idkey } = req.params;

        if (!usuario_idkey || isNaN(usuario_idkey)) {
            return res.status(400).json({ erro: 'ID de usuário inválido' });
        }

        const result = await pool.query(
            `DELETE FROM usuario.usuario WHERE idkey = $1 RETURNING *`, 
            [usuario_idkey]
        );

        return result.rowCount === 0
        ? res.status(404).json({ erro: `Usuário com ID ${usuario_idkey} não foi encontrado` })
        : res.status(200).json({ msg: 'Usuário deletado com sucesso', usuario: result.rows[0] });
        
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        next(error);
    }
};
