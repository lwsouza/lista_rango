const mongoose = require('../../config/database');

const ProdutoSchema = new mongoose.Schema({
    foto: {
        type: String,
        require: true
    },
    nome: {
        type: String,
        require: true,
        unique: true
    },
    preco: {
        type: String,
        require: true
    },
    categoria: {
        type: String,
        require: true
    },
    restaurante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurante',
        require: true,
        unique: true
    },
    promocao: {
        descricao: String,
        precoPromocional: String,
        diaPromocao: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

ProdutoSchema.index({ nome: 1, restaurante: 1 }, { unique: true });

const Produto = mongoose.model('Produto', ProdutoSchema);

module.exports = Produto;