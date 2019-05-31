//Aqui estamos declarando as dependências necessárias para realizar os nossos testes!
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../index');
var should = chai.should();
var fs = require('fs');
 
chai.use(chaiHttp);
 
/**
 * Teste da rota: /GET Produtos
 */
describe('/GET Produtos', function() {

    // Criação de novo produto
    it('Criação de novo produto', function(done) {
        var number = Math.floor(Math.random() * 21 + 1);
        chai.request(server)
        .post(`/produto`)
        .set('Content-Type', 'application/json')
        .field('nome', 'Produto Teste')
        .field('preco', '10,90')
        .field('cartegoria', 'Doce')
        .field('restaurante', '5cf07b35d6227a1918bb6bf7')
        .attach('avatar',
          fs.readFileSync('./src/app/test/img/teste.jpg'),
          'teste.jpg')
        .end(function(error, res) {

            //Se tudo der certo deve retornar o status: 200 - OK
            res.should.have.status(200);

            //Em seguida retornar em um objeto
            res.should.be.a('object');

        done();
        });
    });

    // Atualização do produto
    it('Atualização de produto', function(done) {
        chai.request(server)
        .put(`/produto/5cf072c156ec2527f4949982`)
        .set('Content-Type', 'application/json')
        .field('nome', 'Produto Teste')
        .field('preco', '10,90')
        .field('cartegoria', 'Doce')
        .field('restaurante', '5cf07b35d6227a1918bb6bf7')
        .attach('avatar',
          fs.readFileSync('./src/app/test/img/teste.jpg'),
          'teste.jpg')
        .end(function(error, res) {

            //Se tudo der certo deve retornar o status: 200 - OK
            res.should.have.status(200);

            //Em seguida retornar em um objeto
            res.should.be.a('object');

        done();
        });
    });

    // Retorno da mensagem, após deletar o produto
    it('Deve retornar a mensagem dizendo que o produto foi excluído', function(done) {
        chai.request(server)
        .delete(`/produto/5cf072c156ec2527f4949982`)
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
