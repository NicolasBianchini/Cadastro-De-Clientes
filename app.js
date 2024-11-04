const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyparser = require('body-parser');
const path = require('path');

app.listen('3001', () => {
    console.log("Servidor ON!");
});
//Body Parser
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

// Conexao com Banco de Dados

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'node'
});

db.connect(function(err){
    if(err)
    {
        console.log("Nao foi possivel se conectar ao banco!")
    }
})

app.get('/registro', function(req, res){
    let query = db.query("select * from clientes", function(err,results){
        res.render('cadastrados', {lista:results});
    })    
})

app.get('/', function(req, res){

    res.render('index', {});
})

app.post('/', function(req, res){
    console.log("Cadastro concluido!");
    let nome = req.body.nome;
    let sobrenome = req.body.sobrenome;
    let empresa = req.body.empresa;
    let numero = req.body.numero;
    db.query("INSERT INTO clientes (nome,sobrenome,empresa,numero) VALUES (?,?,?,?)", [nome,sobrenome,empresa,numero], function(err, results){})

    res.render('index', {});
})