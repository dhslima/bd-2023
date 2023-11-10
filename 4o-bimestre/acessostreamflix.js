const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '10.1.20.108',
  user: 'testebd',
  password: 'testebd',
  database: 'streamflix',
  port: 3306, // Porta do MySQL, ajuste se necessário
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL com sucesso.');
});

// CREATE
let sql = "INSERT INTO usuarios(login, email, nome," +
"nascimento, senha) VALUES ('dhslima', 'dhslima@email'," +
"'David Lima','1975-04-25', 'senha')";

// connection.query(sql, (err, results) => {
//   if (err) {
//     console.error('Erro na consulta:', err);
//     return;
//   }
//   console.log('Resultado da consulta:', results);
// });

// READ

sql = "SELECT * FROM usuarios"
connection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro na consulta:', err);
      return;
    }
    console.log('Resultado da consulta:', results);
  });

// UPDATE
sql = "UPDATE usuarios SET email = 'dhslima@gmail.com'" +
"WHERE login = 'dhslima'"
connection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro na consulta:', err);
      return;
    }
    console.log('Resultado da consulta:', results);
  });

// DELETE
// sql = "DELETE FROM usuarios WHERE login = ?"
// connection.query(sql, "user6", (err, results) => {
//   if (err) {
//     console.error('Erro na consulta:', err);
//     return;
//   }
//   console.log('Resultado da consulta:', results);
// });

connection.end((err) => {
    if (err) {
        console.error("Erro ao fechar a conexão com o banco de dados:", err);
        return;
    }
    console.log("Conexão encerrada com sucesso")
});