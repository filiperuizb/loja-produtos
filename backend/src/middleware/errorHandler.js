exports.tratarErrosGlobais = (err, req, res, next) => {
    console.error('Erro:', err);
    res.status(500).json({error: err.message || 'Erro interno do servidor'});
};