const usuariosService = require("./usuarios.service");
const usuariosModel = require("./usuarios.model");
const Schema = require("./usuarios.schema");
const { NotFound, BadRequest, Forbidden } = require("../exceptions");
const usuariosSchema = require("./usuarios.schema");


//LEMBRAR DE REMOVER AS REGRAS DO CONTROLLER
module.exports.cadastrar = async (req, res, next) => {
  const { error, value } = Schema.regrasCadastrar.validate(req.body);
  try {
    if (error) {
      return res.status(400).json(error);
    }
    usuario = await usuariosModel.obterPorEmail(req.body.email);
    if (usuario != null) {
      throw new NotFound("Esse email já está sendo usado por outro usuário");
    }
    const resposta = await usuariosService.salvar(req.body);
    return res
      .status(200)
      .json({ data: resposta, message: "Usuario Cadastrado com Sucesso" });
  } catch (erro) {
    return next(erro);
  }
};

module.exports.atualizar = async (req, res, next) => {
  const { error, value } = Schema.regrasCadastrar.validate(req.body);
  try {
    if (error) {
      return res.status(400).json(error);
    }

    if(req.usuario.id != req.params.id) {
      throw new Forbidden("Você só pode atualizar seu proprio usuário");
    }

    usuario = await usuariosModel.obterPorEmail(req.body.email);
    if (usuario != null) {
      throw new NotFound("Esse email já está sendo usado por outro usuário");
    }

    usuario = await usuariosModel.obterPorId(req.params.id);
    if (usuario === null) {
      throw new NotFound("Usuário não encontrado");
    }

    const resposta = await usuariosService.salvar(req.body, req.params.id, false);
    return res
      .status(200)
      .json({ data: resposta, message: "Usuario atualizado com Sucesso" });
  } catch (erro) {
    return next(erro);
  }
};



module.exports.reativar = async (req, res, next) => {
  try {
    if(req.usuario.isAdmin != true) {
      throw new Forbidden("Apenas um administrador pode reativar um usuário, entre em contato com um");
    }

    usuario = await usuariosModel.obterPorId(req.params.id);
    if (usuario === null) {
      throw new NotFound("Usuário não encontrado");
    }
    const resposta = await usuariosService.salvar(usuario, req.params.id, false, true);
    return res
      .status(200)
      .json({ data: resposta, message: "Usuario atualizado com Sucesso" });
  } catch (erro) {
    return next(erro);
  }
};

module.exports.deletar = async (req, res, next) => {
  try {
    usuario = await usuariosModel.obterPorId(req.params.id);

    if(req.usuario.id != req.params.id) {
      throw new Forbidden("Você só pode atualizar seu proprio usuário");
    }

    if (usuario === null) {
      throw new NotFound("Usuário não encontrado");
    }

    if (usuario.get("deletado") === true) {
      throw new NotFound("Usuário já se encontra deletado");
    }

    const resposta = await usuariosService.salvar(usuario, req.params.id, true);
    return res
      .status(200)
      .json({ data: resposta, message: "Usuario deletado com Sucesso" });
  } catch (erro) {
    return next(erro);
  }
};

module.exports.login = async (req, res, next) => {
  let usuario;
  try {
    //LEMBRAR DE ABSTRAIR ISSO PARA UM METODO ANTES DE ENVIAR A PROVA, PROBLEMA DE SOLID AQUI, RESP.ÚNICA
    if (req.body.login != undefined) {
      usuario = await usuariosModel.obterPorLogin(req.body.login);
    }
    if (req.body.email != undefined) {
      usuario = await usuariosModel.obterPorEmail(req.body.email);
    }
    if (usuario === null) {
      throw new NotFound("Usuário não encontrado");
    }
    if(usuario.get('situacao') === 'INATIVO') {
      throw new NotFound("Usuário não pode logar pois está inativo, falar com administrador");
    }
    if(usuario.get('deletado') === true) {
      throw new NotFound(`Esse usuário foi deletado do sistema em ${usuario.get('deletado_em')}`);
    }
    const resposta = await usuariosService.login(req.body, usuario);
    if (resposta) {
      return res.status(200).json({ message: "Login efetuado com sucesso", token: resposta });
    } else {
      return res.status(400).json({ message: "Email ou senha inválido" });
    }
  } catch (erro) {
    return next(erro);
  }
};
