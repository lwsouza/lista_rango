//Aqui estamos declarando as dependências necessárias para realizar os nossos testes!
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../index');
var should = chai.should();
 
chai.use(chaiHttp);
 
/**
 * Teste da rota: /GET Restaurantes
 */
describe('/GET Restaurantes', function() {

    //Retorno da lista de restaurantes
    it('Deve retornar a lista de restaurantes', function(done) {
        chai.request(server)
        .get('/restaurante')
        .end(function(error, res) {
            //Se tudo der certo deve retornar o status: 200 - OK
            res.should.have.status(200);

            //Em seguida retornar em um objeto
            res.should.be.a('object');

            // // Verifica se possui a chave interna "restaurantes"
            res.body.should.have.property('restaurantes');

            // // Verifica se a chave interna é um Array
            res.body.restaurantes.should.be.a('array');

        done();
        });
    });

    // Retorno de um restaurante com seus dados
    it('Deve retornar o restaurante escolhido com seus dados', function(done) {
        chai.request(server)
        .get('/restaurante/5cf0651b1ba9df0b14388195')
        .end(function(error, res) {

            //Se tudo der certo deve retornar o status: 200 - OK
            res.should.have.status(200);

            //Em seguida retornar em um objeto
            res.should.be.a('object');

            // Verifica se possui as chaves internas
            res.body.should.have.property('restaurantes');
            res.body.restaurantes[0].should.have.property('endereco');
            res.body.restaurantes[0].should.have.property('nome');
            res.body.restaurantes[0].should.have.property('foto');
            res.body.restaurantes[0].should.have.property('funcionamento');

            // Verifica se a chave interna é um objeto
            res.body.restaurantes[0].endereco.should.be.a('object');

        done();
        });
    });

    // Retorno dos produtos de um restaurante
    it('Deve retornar os produtos de um restaurante', function(done) {
        chai.request(server)
        .get('/restaurante/5cf0651b1ba9df0b14388195/produto')
        .end(function(error, res) {

            //Se tudo der certo deve retornar o status: 200 - OK
            res.should.have.status(200);

            //Em seguida retornar em um objeto
            res.should.be.a('object');

            // Verifica se a chave interna é um array
            res.body.produtos.should.be.a('array');
            

        done();
        });
    });

    // Criação de novo restaurante
    // it('Criação de novo restaurante', function(done) {
    //     var number = Math.floor(Math.random() * 21 + 1);
    //     chai.request(server)
    //     .post(`/restaurante`)
    //     .send({
    //         nome: "Restaurante Teste",
    //         foto: "Teste",
    //         endereco: {
    //             cidade: "Cidade Teste",
    //             uf: "SP",
    //             rua: "Rua testando",
    //             numero: 200,
    //             bairro: "Bairro Teste",
    //             cep: "26366-908"
    //         },
    //         funcionamento: "De Segunda a Sexta das 9h ás 18h"
    //     })
    //     .end(function(error, res) {

    //         //Se tudo der certo deve retornar o status: 200 - OK
    //         res.should.have.status(200);

    //         //Em seguida retornar em um objeto
    //         res.should.be.a('object');

    //         // Verifica se possui a chave interna "game"
    //         res.body.should.have.property('restaurante');
    //         res.body.restaurantes.should.have.property('endereco');
    //         res.body.restaurantes.should.have.property('nome');
    //         res.body.restaurantes.should.have.property('foto');
    //         res.body.restaurantes.should.have.property('funcionamento');

    //         // Verifica se a chave interna é um objeto
    //         res.body.restaurantes[0].endereco.should.be.a('object');

    //     done();
    //     });
    // });

    // Retorno da mensagem, após deletar o restaurante
    // it('Deve retornar a mensagem dizendo que o restaurante foi excluído', function(done) {
    //     chai.request(server)
    //     .delete(`/restaurante/5cf07b35d6227a1918bb6bf7`)
    //     .end(function(error, res) {

    //         //Se tudo der certo deve retornar o status: 200 - Ok
    //         res.should.have.status(200);

    //         //Em seguida retornar uma string
    //         res.text.should.be.a('string');

    //         // Verifica se o resultado retornado é igual ao esperado
    //         res.text.should.equal('Deletado com sucesso!');

    //     done();
    //     });
    // });
});
