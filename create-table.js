const mysql = require('mysql');

const conexao = mysql.createConnection({
    host     : 'mysql669.umbler.com',
    port     : 41890,
    user     : 'marlonadmin',
    password : 'adminmarlon',
    database : 'marlonadmin'
  });


function createTable(conn){

    const sql = "CREATE TABLE IF NOT EXISTS Clientes (\n"+
                "ID int NOT NULL AUTO_INCREMENT,\n"+
                "Nome varchar(150) NOT NULL,\n"+
                "CPF char(11) NOT NULL,\n"+
                "PRIMARY KEY (ID)\n"+
                ");";
    
    conn.query(sql, function (error, results, fields){
        if(error) return console.log(error);
        console.log('criou a tabela!');

        
        
    });
}

function addRows(conn){
    const sql = "INSERT INTO Clientes(Nome,CPF) VALUES ?";
    const values = [
          ['teste1', '12345678901'],
          ['teste1', '09876543210'],
          ['teste3', '12312312399']
        ];
    conn.query(sql, [values], function (error, results, fields){
            if(error) return console.log(error);
            console.log('adicionou registros!');
            conn.end();//fecha a conexão
        });
  }

conexao.connect(function(err){
  if(err) return console.log(err);
  console.log('conectou!');
    createTable(conexao);
    addRows(conexao);
});

