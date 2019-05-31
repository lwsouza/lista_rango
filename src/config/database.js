
const mongoose = require('mongoose');

// Configure o usuário, senha e URL do banco de dados
mongoose.connect('mongodb://admin:goomer2019rango@ds141454.mlab.com:41454/listarango', { useNewUrlParser: true });

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

module.exports = mongoose;