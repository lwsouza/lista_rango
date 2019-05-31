# GOOMER - LISTA RANGO

## Desafio/Problemas
- Realização de testes no método POST e PUT utilizando imagem

## Melhorias
- Tratamentos de exceções
- Verificação de dados obrigatórios e tipos de dados

## Rodar aplicação

Ao clonar o repositório, execute o seguinte comando para instalação das bibliotecas:
> npm install

    Acesse o repositório src/config e o arquivo database.js para configurar o banco de dados.
    Está configurado um banco de dados na nuvem caso queiram utilizar.

Para execução dos testes, execute o comando:
> npm test

Para iniciar a aplicação, execute:
> npm start

___

## Documentação

- URI para consultas (GET) disponíveis no projeto:

> http://localhost:3000/restaurante -> Lista todos os restaurantes  
> http://localhost:3000/restaurante/:id_restaurante -> Lista um único restaurante com seus dados  
> http://localhost:3000/restaurante/:id_restaurante/produto -> Lista todos os produtos de um restaurante

- URI para cadastro (POST) disponíveis no projeto:

> http://localhost:3000/restaurante -> Content-Type: application/json

    Parâmetros:  
    nome: String
    foto: file
    cidade: String
    uf: String
    rua: String
    numero: Number
    bairro: String
    funcionamento: String
![ParâmetrosRestaurante](/img_doc/params_restaurante.png)

> http://localhost:3000/produto -> Content-Type: application/json

    Parâmetros:
    nome: String
    foto: String
    preco: String
    categoria: String
    restaurante: ObjectId
    descricao: String
    precoPromocional: String
    diaPromocao: String

![ParâmetrosProduto](/img_doc/params_produto.png)

- URI para atualização (PUT) disponíveis no projeto:

> http://localhost:3000/restaurante/:id_restaurante > Content-Type: application/json

    Parâmetros:  
    nome: String
    foto: file
    cidade: String
    uf: String
    rua: String
    numero: Number
    bairro: String
    funcionamento: String

> http://localhost:3000/produto/:id_produto > Content-Type: application/json

    Parâmetros:
    nome: String
    foto: String
    preco: String
    categoria: String
    restaurante: ObjectId
    descricao: String
    precoPromocional: String
    diaPromocao: String

- URI para remoção (DELETE) disponiveís no projeto:

> http://localhost:3000/restaurante/:id_restaurante -> Remove o restaurante e seus produtos
> http://localhost:3000/produto/:id_produto -> Remove um produto
