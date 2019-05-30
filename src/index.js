const express = require('express');
const bodyParser = require('body-parser');
const multiparty = require('connect-multiparty');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(multiparty());


require('./app/controllers/index')(app);

app.listen(3000, function(){
    console.log("API Funcionando!");
});