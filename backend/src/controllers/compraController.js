const pool = require('../config/database');

exports.registrarCompra = async (req, res, next) => {
    const { usuario_idkey } = req.body;

    if (!usuario_idkey) {
        return res.status(400).json({ error: 'usuario_idkey é obrigatório' });
    }

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const carrinho = await client.query(`
            SELECT produto_idkey, quantidade
            FROM usuario.carrinho_usuario
            WHERE usuario_idkey = $1
        `, [usuario_idkey]);

        if (carrinho.rows.length === 0) {
            return res.status(400).json({ error: 'Carrinho vazio' });
        }

        for (const item of carrinho.rows) {
            const { produto_idkey, quantidade } = item;

            const produtoResult = await client.query(`
                SELECT preco, estoque FROM produtos.produtos
                WHERE idkey = $1
            `, [produto_idkey]);

            const produto = produtoResult.rows[0];

            if (!produto) {
                throw new Error(`Produto ID ${produto_idkey} não encontrado`);
            }

            if (produto.estoque < quantidade) {
                throw new Error(`Estoque insuficiente para o produto ID ${produto_idkey}`);
            }

            const total = produto.preco * quantidade;

            await client.query(`
                INSERT INTO usuario.compras_usuario
                (usuario_idkey, produto_idkey, quantidade, data_compra, total)
                VALUES ($1, $2, $3, NOW(), $4)
            `, [usuario_idkey, produto_idkey, quantidade, total]);

            await client.query(`
                UPDATE produtos.produtos
                SET estoque = estoque - $1
                WHERE idkey = $2
            `, [quantidade, produto_idkey]);
        }

        await client.query(`
            DELETE FROM usuario.carrinho_usuario
            WHERE usuario_idkey = $1
        `, [usuario_idkey]);

        await client.query('COMMIT');
        res.status(201).json({ mensagem: 'Compra finalizada com sucesso' });

    } catch (error) {
        await client.query('ROLLBACK');
        next(error);
    } finally {
        client.release();
    }
}

exports.listarCompra = async(req, res, next) => {
    try {
        const result = await pool.query(`
            SELECT 
                cu.idkey AS compra_id,
                u.nome AS nome_usuario,
                p.nome AS nome_produto,
                cu.quantidade,
                cu.total,
                cu.data_compra
            FROM usuario.compras_usuario cu
            JOIN usuario.usuario u ON cu.usuario_idkey = u.idkey
            JOIN produtos.produtos p ON cu.produto_idkey = p.idkey
            ORDER BY cu.data_compra DESC
        `);
        res.status(200).json(result.rows);
    } catch(error) {
        next(error);
    }
}