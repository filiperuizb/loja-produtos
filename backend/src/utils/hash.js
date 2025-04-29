const bcrypt = require('bcrypt');

exports.hashSenha = async(senha) => {
    const salt = await bcrypt.genSalt(10);

    return await bcrypt.hash(senha, salt);
};

exports.validarSenha = async (senhaDigitada, senhaBanco) => {
    return await bcrypt.compare(senhaDigitada, senhaBanco);
}