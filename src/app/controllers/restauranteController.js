const express = require('express');
const fs = require('fs');

const Restaurante = require('../models/restaurante');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const restaurantes = await Restaurante.find().select({ _id: 0, nome: 1 });

        res.status(200).send({ restaurantes });

    } catch (err) {
        res.status(400).send({ error: 'Erro ao carregar os restaurantes'});
    }
});

router.get('/:id', async (req, res) => {
    try {
        var id = req.params.id
        const restaurantes = await Restaurante.find({_id: id});

        res.status(200).send({ restaurantes });

    } catch (err) {
        res.status(400).send({ error: 'Erro ao carregar os restaurantes'});
    }
});


router.post('/', async (req, res) => {
    try {

        // var date = new Date();
        // var time_stamp = date.getTime();

        // var url_imagem = time_stamp + '_' + req.files.foto.originalFilename;
        var url_imagem = "Teste";

        // var path_origem = '.'+req.files.foto.path;
        // var path_destino = `./src/app/uploads/${url_imagem}`;

        // fs.rename(path_origem, path_destino, function(err){
        //     if (err) {
        //         res.status(500).json({error: err});
        //         return;
        //     }

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
                funcionamento: {
                    segunda_sexta: [req.body.inicioSegSex, req.body.fimSegSex],
                    sabado_domingo: [req.body.inicioSabDom, req.body.fimSabDom]
                }
            }

            const restaurante = await Restaurante.create(dados);

            await restaurante.save();

            res.status(200).send({ restaurante });
        // });

        

    } catch (err) {
        res.status(400).send({ error: 'Erro ao criar novo restaurante'});
    }
});

module.exports = app => app.use('/restaurante', router);