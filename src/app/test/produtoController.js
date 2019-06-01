//Aqui estamos declarando as dependências necessárias para realizar os nossos testes!
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../index');
var should = chai.should();
var fs = require('fs');

chai.use(chaiHttp);

/**
 * Teste da rota: / Produtos
 */
describe('/Produtos', function () {

    // // Criação de novo produto
    it('Criação de novo produto', function (done) {
        var number = Math.floor(Math.random() * 21 + 1);
        chai.request(server)
            .post(`/produto`)
            .set('Content-Type', 'application/json')
            .field('nome', 'Produto Teste')
            .field('preco', '10,90')
            .field('categoria', 'Doce')
            .field('restaurante', '5cf2a96b1d0c04273c97d642')
            .attach('foto',
                fs.readFileSync('./src/app/test/img/teste.jpg'),
                'teste.jpg')
            .end(function (error, res) {

                //Em seguida retornar em um objeto
                res.should.be.a('object');

                done();
            });
    });

    // // Atualização do produto
    it('Atualização de produto', function (done) {
        chai.request(server)
            .put(`/produto/5cf2b290577aef22a8a4a9e7`)
            .set('Content-Type', 'application/json')
            .field('nome', 'Produto Teste')
            .field('preco', '10,90')
            .field('categoria', 'Doce')
            .field('restaurante', '5cf2a96b1d0c04273c97d642')
            .attach('foto',
                fs.readFileSync('./src/app/test/img/teste.jpg'),
                'teste.jpg')
            .end(function (error, res) {

                //Em seguida retornar em um objeto
                res.should.be.a('object');

                done();
            });
    });

    // Retorno da mensagem, após deletar o produto
    it('Deve retornar a mensagem dizendo que o produto foi excluído', function (done) {
        chai.request(server)
            .delete(`/produto/5cf2b290577aef22a8a4a9e7`)
            .end(function (error, res) {

                //Em seguida retornar uma string
                res.text.should.be.a('string');

                // Verifica se o resultado retornado é igual ao esperado
                res.text.should.equal('Deletado com sucesso!');

                done();
            });
    });
});
