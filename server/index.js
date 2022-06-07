/* Express utilizando para fornecer métodos para especificar*/
/* qual função é chamada quando chega requisição HTTP (GET, POST, SET, etc)*/

const express = require("express");
const app = express();
require("./src/routes/index")(app);
const mysql = require("mysql");
const cors = require("cors");

/* Cors é um recurso de segurança de navegador que restringe solicitações HTTP entre
origens que são iniciadas em scripts em execução no navegador (protocolos, domínios, 
subdomínios ou portas diferentes)*/

app.use(cors());
app.use(express.json());

/* Fazendo a requisição para o DB */
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "schoolsCalendar",
});

/* Criando conforme o DB, uma requisição e o envio de infos*/
app.post("/create", (req, res) => {
  const codigo = req.body.codigo;

  const nome = req.body.nome;
  const idade = req.body.idade;

  /* Inserindo dados no DB*/
  db.query(
    "INSERT INTO aluno (codigo, nome, idade) VALUES (?,?,?)",
    [codigo, nome, idade],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Sucesso!");
      }
    }
  );
});

/* Buscando informações no DB*/
app.get("/schoolsCalendar", (req, res) => {
  db.query("SELECT * FROM aluno", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

/* Atualizando dados no DB*/
app.put("/update", (req, res) => {
  const codigo = req.body.codigo;
  const idade = req.body.idade;
  db.query(
    "UPDATE aluno SET idade = ? WHERE codigo = ?",
    [idade, codigo],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

/* Deletando dados do DB*/
app.delete("/delete/:codigo", (req, res) => {
  const codigo = req.params.codigo;
  db.query("DELETE FROM aluno WHERE codigo = ?", codigo, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

/* Conectando com o DB*/
app.listen(3333, () => {
  console.log("Logado na porta 3333!");
});
