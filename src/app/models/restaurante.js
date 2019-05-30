const mongoose = require('../../config/database');

const RestauranteSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true,
        unique: true
    },
    foto: {
        type: String,
        require: true
    },
    endereco: {
        cidade: {
            type: String,
            require: true
        },
        uf: {
            type: String,
            require: true,
            uppercase: true
        },
        rua: {
            type: String,
            require: true
        },
        numero: {
            type: Number,
            require: true
        },
        bairro: {
            type: String,
            require: true
        },
        cep: {
            type: String,
            require: true
        }
    },
    funcionamento: {
        segunda_sexta: [],
        sabado_domingo: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Restaurante = mongoose.model('Restaurante', RestauranteSchema);

module.exports = Restaurante;