var bookshelf = require("../db");

var Usuarios = bookshelf.Model.extend(
  {
    tableName: "usuario",
  },
  {
    async obterPorEmail(email) {
      return this.forge({ email: email }).fetch();
    },
    async obterPorLogin(login) {
      return this.forge({ login: login }).fetch();
    },
    async obterPorId(id) {
      return this.forge({ id: id }).fetch();
    },
  }
);

module.exports = Usuarios;
