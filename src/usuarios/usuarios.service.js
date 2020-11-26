const bookshelf = require('../db');
const usuariosModel = require('./usuarios.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//TODO: POSSO DEPOIS JUNTAR TUDO EM UM SÓ "MONTARDADOS", MAS PRECISO PENSAR EM MAIS REGRA DE NEGOCIO
const montarDados = async (dado, id) => {
  const dadosFormatados = {
    id: id != null ? id : dado.id,
    nome: dado.nome,
    email: dado.email,
    senha: dado.senha,
    login: dado.login,
  };
  const hash = await new Promise((resolve, reject) => {
    bcrypt.hash(dadosFormatados.senha, 10, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });
  dadosFormatados.senha = hash;
  return dadosFormatados;
};

const montarDadosDelecao = async (dado, id) => {
  const dadosFormatados = {
    id: id,
    nome: dado.nome,
    email: dado.email,
    senha: dado.senha,
    login: dado.login,
    deletado: true,
    deletado_em: new Date(),
    situacao: 'INATIVO',
  };
  return dadosFormatados;
};

const montarDadosReativacao = async (dado, id) => {
  const dadosFormatados = {
    id: id,
    nome: dado.nome,
    email: dado.email,
    senha: dado.senha,
    login: dado.login,
    deletado: false,
    deletado_em: null,
    situacao: 'ATIVO',
  };
  return dadosFormatados;
};

const salvar = async (dado, id, deletar, reativar) =>
  bookshelf.transaction(async (transacao) => {
    let objetoMontado;
    if (deletar) {
      objetoMontado = await montarDadosDelecao(dado, id);
    } else if (reativar) {
      objetoMontado = await montarDadosReativacao(dado, id);
    } else {
      objetoMontado = await montarDados(dado, id);
    }
    try {
      const usuarioCriado = await usuariosModel
        .forge({
          id: objetoMontado.id,
        })
        .save(objetoMontado, { transacting: transacao });
      return usuarioCriado;
    } catch (error) {
      throw error;
    }
  });

const login = async (dado, usuario) =>
  bookshelf.transaction(async (transacao) => {
    try {
      const resp = await new Promise((resolve, error) => {
        bcrypt.compare(dado.senha, usuario.get('senha'), (err, success) => {
          if (err) {
            return error(err);
          }
          resolve(success);
        });
      });
      if (resp) {
        const token = jwt.sign(
          {
            id: usuario.get('id'),
            nome: usuario.get('nome'),
            email: usuario.get('email'),
            login: usuario.get('login'),
            isAdmin: usuario.get('isAdmin'),
            situacao: usuario.get('situacao'),
          },
          process.env.KEY_JWT,
          {
            expiresIn: '1h',
          },
        );
        return token;
      }
      return false;
    } catch (error) {
      throw error;
    }
  });

module.exports = {
  salvar,
  login,
};
