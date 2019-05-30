const express = require('express');
const fs = require('fs');

const Restaurante = require('../models/restaurante');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const restaurantes = await Restaurante.find().select({ nome: 1 });

        res.status(200).send({ restaurantes });

    } catch (err) {
        res.status(400).send({ error: 'Erro ao carregar os restaurantes' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        var id = req.params.id
        const restaurantes = await Restaurante.find({ _id: id });

        res.status(200).send({ restaurantes });

    } catch (err) {
        res.status(400).send({ error: 'Erro ao carregar os restaurantes' });
    }
});


router.post('/', async (req, res) => {
    try {

        res.setHeader("Access-Control-Allow-Origin", "*");

        var date = new Date();
        var time_stamp = date.getTime();

        var url_imagem = time_stamp + '_' + req.files.foto.originalFilename;

        var path_origem = req.files.foto.path;
        var path_destino = `./src/app/uploads/restaurante/${url_imagem}`;

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

router.put('/:id', async (req, res) => {
    try {

        res.setHeader("Access-Control-Allow-Origin", "*");

        var date = new Date();
        var time_stamp = date.getTime();

        var url_imagem = time_stamp + '_' + req.files.foto.originalFilename;

        var path_origem = req.files.foto.path;
        var path_destino = `./src/app/uploads/restaurante/${url_imagem}`;

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

    } catch (err) {
        console.log(err)
        res.status(400).send({ error: 'Erro ao atualizar o restaurante'});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Restaurante.findByIdAndRemove(req.params.id);

        return res.send("Deletado com sucesso!");

    } catch (err) {
        res.status(400).send({ error: 'Erro ao deletar restaurante'});
    }
});

module.exports = app => app.use('/restaurante', router);