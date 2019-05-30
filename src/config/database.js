
const mongoose = require('mongoose');

mongoose.connect('mongodb://admin:goomer2019rango@ds141454.mlab.com:41454/listarango', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true)
mongoose.Promise = global.Promise;

module.exports = mongoose;