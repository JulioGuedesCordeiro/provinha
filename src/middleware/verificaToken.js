const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token, process.env.KEY_JWT);
    req.usuario = decode;
    next();
  } catch (error) {
    return res
      .status(403)
      .send({
        message: 'Acesso negado, sem permissão de acesso ao sistema, token invalido ou expirado',
      });
  }
};
