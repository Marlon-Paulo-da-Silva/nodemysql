const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const mysql = require('mysql');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();


router.get('/', (req, res) => res.json({ message: 'Funcionandoo'}));

router.get('/clientes/:id?', (req, res) => {
    let filtro = '';
    if (req.params.id) filtro = ' WHERE ID='+ parseInt(req.params.id);
    execSQLQuery('SELECT * FROM Clientes' + filtro, res);
});

router.delete('/clientes/:id', (req, res) => {
    execSQLQuery('DELETE FROM Clientes WHERE ID='+ parseInt(req.params.id), res)
});



router.post('/clientes', (req, res) => {
    const nome = req.body.nome.substring(0, 150);
    const cpf = req.body.cpf.substring(0, 11);

    execSQLQuery(`INSERT INTO Clientes(Nome, CPF) VALUES('${nome}', '${cpf}')`, res);
});

app.use('/', router);

app.listen(port);
console.log('API, funcionando...');

function execSQLQuery(sqlQry, res){
    const conexao = mysql.createConnection({
        host     : 'mysql669.umbler.com',
        port     : 41890,
        user     : 'marlonadmin',
        password : 'adminmarlon',
        database : 'marlonadmin'
    });
  
    conexao.query(sqlQry, function(error, results, fields){
        if(error) 
          res.json(error);
        else
          res.json(results);
        conexao.end();
        console.log('executou!');
    });
  }