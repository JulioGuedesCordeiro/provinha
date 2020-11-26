const bookshelf = require('../db');
const votosModel = require('./votos.model');

const montarDados = async (dado, id) => {
  const dadosFormatados = {
    valor: dado.valor,
    filme_id: dado.filme_id,
  };
  return dadosFormatados;
};

const salvar = async (dado) =>
  bookshelf.transaction(async (transacao) => {
    const objetoMontado = await montarDados(dado);
    try {
      const voto = await votosModel.forge().save(objetoMontado, { transacting: transacao });
      return voto;
    } catch (error) {
      throw error;
    }
  });

module.exports = {
  salvar,
};
