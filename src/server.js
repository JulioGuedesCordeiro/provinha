const env = require('./env');
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(require('./routes'));

const { AbstractError, InternalServerError, NotFound } = require('./exceptions');
app.use((req, res, next) => {
  next(new NotFound());
});

app.use((err, req, res, next) => {
  if (err instanceof AbstractError) {
    const { name, statusCode, message } = err;
    return res.status(statusCode).json({
      name,
      statusCode,
      message,
    });
  }
  return res.status(500).json(new InternalServerError());
});


app.listen(process.env.PORT || env.port, () => {
  console.log(`🚀 Servidor rodando na porta ${env.port}`);
});

module.exports = app;