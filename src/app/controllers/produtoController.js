const express = require('express');
const fs = require('fs');
var mongoose = require('mongoose');

const Produto = require('../models/produto');

const router = express.Router();

// Criação do produto
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
        var path_destino = `./src/app/uploads/produto/${url_imagem}`;

        // Move a imagem para a pasta de uploads
        fs.rename(path_origem, path_destino, async function (err) {
            if (err) {
                res.status(500).json({ error: err });
                return;
            }

            var dados = {
                nome: req.body.nome,
                foto: url_imagem,
                preco: req.body.preco,
                categoria: req.body.categoria,
                restaurante: mongoose.Types.ObjectId(req.body.restaurante),
                promocao: {
                    descricao: req.body.descricao,
                    precoPromocional: req.body.precoPromocional,
                    diaPromocao: req.body.diaPromocao
                }
            }

            await Produto.create(dados, async function (err, produto) {

                if (err) {
                    res.status(500).json({ error: "Produto já cadastrado!" });
                    return;
                }

                res.status(200).send({ produto });

            });


        });

    } catch (err) {
        res.status(400).send({ error: 'Erro ao criar novo produto' });
    }
});

// Atualiza os dados do produto
router.put('/:id', async (req, res) => {
    try {

        res.setHeader("Access-Control-Allow-Origin", "*");

        // Verifica se tem atualização de imagem
        if (Object.keys(req.files).length !== 0) {

            var date = new Date();
            var time_stamp = date.getTime();

            var url_imagem = time_stamp + '_' + req.files.foto.originalFilename;

            var path_origem = req.files.foto.path;
            var path_destino = `./src/app/uploads/produto/${url_imagem}`;

            // Move para a pasta de uploads
            fs.rename(path_origem, path_destino, async function (err) {
                if (err) {
                    res.status(500).json({ error: err });
                    return;
                }

                var dados = {
                    nome: req.body.nome,
                    foto: url_imagem,
                    preco: req.body.preco,
                    categoria: req.body.categoria,
                    promocao: {
                        descricao: req.body.descricao,
                        precoPromocional: req.body.precoPromocional,
                        diaPromocao: req.body.diaPromocao
                    }
                }

                await Produto.findByIdAndUpdate(req.params.id, dados, { new: true }, async function (err, produto) {

                    if (err) {
                        res.status(500).json({ error: "Erro ao atualizar!" });
                        return;
                    }

                    res.status(200).send({ produto });

                });
            });
        } else {
            // Caso não tenha alteração da imagem
            var dados = {
                nome: req.body.nome,
                preco: req.body.preco,
                categoria: req.body.categoria,
                promocao: {
                    descricao: req.body.descricao,
                    precoPromocional: req.body.precoPromocional,
                    diaPromocao: req.body.diaPromocao
                }
            }

            await Produto.findByIdAndUpdate(req.params.id, dados, { new: true }, async function (err, produto) {

                if (err) {
                    res.status(500).json({ error: "Erro ao atualizar!" });
                    return;
                }

                res.status(200).send({ produto });

            });

        }

    } catch (err) {
        console.log(err)
        res.status(400).send({ error: 'Erro ao atualizar o produto' });
    }
});

// Deleta o produto
router.delete('/:id', async (req, res) => {
    try {
        var produto = await Produto.findByIdAndRemove(req.params.id);

        fs.unlink(`./src/app/uploads/produto/${produto.foto}`, async (err) => {
            if (err) throw err;

            return res.send("Deletado com sucesso!");
        });

    } catch (err) {
        res.status(400).send({ error: 'Erro ao deletar produto' });
    }
});

module.exports = app => app.use('/produto', router);