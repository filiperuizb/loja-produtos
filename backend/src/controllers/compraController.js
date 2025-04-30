const pool = require('../config/database');

/* 
    Será necessário depois de fazer o editar das outras rotas adicionar uma tabela de carrinho e passar ela pra compra, excluindo o campo quantidade e total
*/

exports.registrarCompra = async (req, res, next) => {
    console.log(`REQUISIÇÃO: `, req.body);
    const { usuario_idkey, produto_idkey, quantidade, total } = req.body;
    
    if([usuario_idkey, produto_idkey, quantidade, total].some(v => v === undefined)) {
        return res.status(400).json({error: 'Campos obrigatórios estão faltando'});
    }

    try {
        const result = await pool.query(
            `INSERT INTO usuario.compras_usuario (usuario_idkey, produto_idkey, quantidade, data_compra, total) VALUES($1, $2, $3, NOW(), $4) RETURNING *`, [usuario_idkey, produto_idkey, quantidade, total]
        );
        res.status(201).json(result.rows[0]);
    } catch(error) {
        next(error);
    }
}

exports.listarCompra = async(req, res, next) => {
    try {
        const result = await pool.query (
            `SELECT * FROM usuario.compras_usuario`
        )
        res.status(200).json(result.rows);
    } catch(error) {
        next(error);
    }
}