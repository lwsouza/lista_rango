//Aqui estamos declarando as dependências necessárias para realizar os nossos testes!
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../index');
var should = chai.should();
var fs = require('fs');
 
chai.use(chaiHttp);
 
/**
 * Teste da rota: /GET Restaurantes
 */
describe('/Restaurantes', function() {

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

    // // Retorno de um restaurante com seus dados
    it('Deve retornar o restaurante escolhido com seus dados', function(done) {
        chai.request(server)
        .get('/restaurante/5cf2b18d8c9f4f08684e2b4c')
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

    // // Retorno dos produtos de um restaurante
    it('Deve retornar os produtos de um restaurante', function(done) {
        chai.request(server)
        .get('/restaurante/5cf2b18d8c9f4f08684e2b4c/produto')
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
    it('Criação de novo restaurante', function(done) {
        var number = Math.floor(Math.random() * 21 + 1);
        chai.request(server)
        .post(`/restaurante`)
        .set('Content-Type', 'application/json')
        .field('nome', 'Restaurante Teste')
        .field('lastName', 'Isaiah')
        .field('cidade', 'Cidade Teste')
        .field('uf', 'sp')
        .field('rua', 'Rua testando')
        .field('numero', '200')
        .field('bairro', 'Bairro Teste')
        .field('cep', '26366-908')
        .field('funcionamento', 'De Segunda à Sexta das 09h as 18h e de Sabado à Domingo das 11h as 20h')
        .attach('foto',
          fs.readFileSync('./src/app/test/img/teste.jpg'),
          'teste.jpg')
        .end(function(error, res) {

            //Em seguida retornar em um objeto
            res.should.be.a('object');

            // Verifica se possui a chave interna
            res.body.should.have.property('restaurante');
            res.body.restaurante.should.have.property('endereco');
            res.body.restaurante.should.have.property('nome');
            res.body.restaurante.should.have.property('foto');
            res.body.restaurante.should.have.property('funcionamento');

            // Verifica se a chave interna é um objeto
            res.body.restaurante.endereco.should.be.a('object');

        done();
        });
    });

    // // Atualização do restaurante
    it('Atualização de restaurante', function(done) {
        chai.request(server)
        .put(`/restaurante/5cf2b25d8c9f4f08684e2b55`)
        .set('Content-Type', 'application/json')
        .field('nome', 'Restaurante Teste Filial')
        .field('lastName', 'Isaiah')
        .field('cidade', 'Cidade Teste')
        .field('uf', 'sp')
        .field('rua', 'Rua testando')
        .field('numero', '200')
        .field('bairro', 'Bairro Teste')
        .field('cep', '26366-908')
        .field('funcionamento', 'De Segunda à Sexta das 09h as 18h e de Sabado à Domingo das 11h as 20h')
        .attach('foto',
          fs.readFileSync('./src/app/test/img/teste.jpg'),
          'teste.jpg')
        .end(function(error, res) {

            //Em seguida retornar em um objeto
            res.should.be.a('object');

            // Verifica se possui a chave interna
            res.body.should.have.property('restaurante');
            res.body.restaurante.should.have.property('endereco');
            res.body.restaurante.should.have.property('nome');
            res.body.restaurante.should.have.property('foto');
            res.body.restaurante.should.have.property('funcionamento');

            // Verifica se a chave interna é um objeto
            res.body.restaurante.endereco.should.be.a('object');

        done();
        });
    });

    // Retorno da mensagem, após deletar o restaurante
    it('Deve retornar a mensagem dizendo que o restaurante foi excluído', function(done) {
        chai.request(server)
        .delete(`/restaurante/5cf2b25d8c9f4f08684e2b55`)
        .end(function(error, res) {

            //Se tudo der certo deve retornar o status: 200 - Ok
            res.should.have.status(200);

            //Em seguida retornar uma string
            res.text.should.be.a('string');

            // Verifica se o resultado retornado é igual ao esperado
            res.text.should.equal('Deletado com sucesso!');

        done();
        });
    });
});
