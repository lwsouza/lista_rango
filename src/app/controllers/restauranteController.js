const express = require('express');
const fs = require('fs');

const Restaurante = require('../models/restaurante');
const Produto = require('../models/produto');

const router = express.Router();

// Lista todos os restaurantes
router.get('/', async (req, res) => {
    try {
        const restaurantes = await Restaurante.find().select({ nome: 1 });

        res.status(200).send({ restaurantes });

    } catch (err) {
        res.status(400).send({ error: 'Erro ao carregar os restaurantes' });
    }
});

// Lista apenas um restaurante e seus dados
router.get('/:id', async (req, res) => {
    try {
        var id = req.params.id
        const restaurantes = await Restaurante.find({ _id: id });

        res.status(200).send({ restaurantes });

    } catch (err) {
        res.status(400).send({ error: 'Erro ao carregar os restaurantes' });
    }
});

//Lista todos os produtos de um restaurante
router.get('/:id/produto', async (req, res) => {
    try {
        var id = req.params.id
        const produtos = await Produto.find({ restaurante: id });

        res.status(200).send({ produtos });

    } catch (err) {
        res.status(400).send({ error: 'Erro ao carregar os produtos' });
    }
});

// Cria um novo restaraunte
router.post('/', async (req, res) => {
    try {

        res.setHeader("Access-Control-Allow-Origin", "*");

        // Verifica se tem imagem
        if (Object.keys(req.files).length == 0) {
            res.status(500).json({ error: "Foto é obrigatório!" });
            return;
        }

        var date = new Date();
        var time_stamp = date.getTime();

        var url_imagem = time_stamp + '_' + req.files.foto.originalFilename;

        var path_origem = req.files.foto.path;
        var path_destino = `./src/app/uploads/restaurante/${url_imagem}`;

        // Move a imagem para o diretório de uplods
        fs.rename(path_origem, path_destino, async function (err) {
            if (err) {
                res.status(500).json({ error: err });
                return;
            }

            var dados = {
                nome: req.body.nome,
                foto: url_imagem,
                endereco: {
                    cidade: req.body.cidade,
                    uf: req.body.uf,
                    rua: req.body.rua,
                    numero: req.body.numero,
                    bairro: req.body.bairro,
                    cep: req.body.cep
                },
                funcionamento: req.body.funcionamento
            }

            // Adiciona o restaurante ao BD
            await Restaurante.create(dados, async function (err, restaurante) {

                if (err) {
                    res.status(500).json({ error: "Restaurante já cadastrado!" });
                    return;
                }

                res.status(200).send({ restaurante });

            });


        });

    } catch (err) {
        res.status(400).send({ error: 'Erro ao criar novo restaurante' });
    }
});

// Atualiza os dados do restaurante
router.put('/:id', async (req, res) => {
    try {

        res.setHeader("Access-Control-Allow-Origin", "*");

        // Verifica se vai alterar a iamge ou não
        if (Object.keys(req.files).length !== 0) {

            var date = new Date();
            var time_stamp = date.getTime();

            var url_imagem = time_stamp + '_' + req.files.foto.originalFilename;

            var path_origem = req.files.foto.path;
            var path_destino = `./src/app/uploads/restaurante/${url_imagem}`;

            // Move a imagem para a pasta de uplods
            fs.rename(path_origem, path_destino, async function (err) {
                if (err) {
                    res.status(500).json({ error: err });
                    return;
                }

                var dados = {
                    nome: req.body.nome,
                    foto: url_imagem,
                    endereco: {
                        cidade: req.body.cidade,
                        uf: req.body.uf,
                        rua: req.body.rua,
                        numero: req.body.numero,
                        bairro: req.body.bairro,
                        cep: req.body.cep
                    },
                    funcionamento: req.body.funcionamento
                }

                await Restaurante.findByIdAndUpdate(req.params.id, dados, { new: true }, async function (err, restaurante) {

                    if (err) {
                        res.status(500).json({ error: "Erro ao atualizar!" });
                        return;
                    }

                    res.status(200).send({ restaurante });

                });
            });
        } else {
            // Caso não altere a imagem
            var dados = {
                nome: req.body.nome,
                endereco: {
                    cidade: req.body.cidade,
                    uf: req.body.uf,
                    rua: req.body.rua,
                    numero: req.body.numero,
                    bairro: req.body.bairro,
                    cep: req.body.cep
                },
                funcionamento: req.body.funcionamento
            }

            await Restaurante.findByIdAndUpdate(req.params.id, dados, { new: true }, async function (err, restaurante) {

                if (err) {
                    res.status(500).json({ error: "Erro ao atualizar!" });
                    return;
                }

                res.status(200).send({ restaurante });

            });

        }

    } catch (err) {
        console.log(err)
        res.status(400).send({ error: 'Erro ao atualizar o restaurante' });
    }
});

// Deleta o restaurante
router.delete('/:id', async (req, res) => {
    try {

        // Deleta o restaurante
        var restaurant = await Restaurante.findByIdAndRemove(req.params.id);

        // Apaga a foto do restaurante
        fs.unlink(`./src/app/uploads/restaurante/${restaurant.foto}`, async (err) => {
            if (err) throw err;

            var getProdutos = await Produto.find({ restaurante: req.params.id });

            // Apaga a foto dos produtos
            getProdutos.forEach(async element => {

                await fs.unlink(`./src/app/uploads/produto/${element.foto}`, async (err) => {
                    if (err) throw err;
                });

            });

            // Deleta seus produtos
            await Produto.deleteMany({ restaurante: req.params.id });

            return res.send("Deletado com sucesso!");
        });



    } catch (err) {
        console.log(err)
        res.status(400).send({ error: 'Erro ao deletar restaurante' });
    }
});


module.exports = app => app.use('/restaurante', router);