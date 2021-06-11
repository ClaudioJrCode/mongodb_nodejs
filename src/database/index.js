const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/noderest", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

module.exports = mongoose;//Para usar no ./models/user.js

//O caminho do DB até Autenticação Moongose>>>Models>>>>AuthController