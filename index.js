const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

app.use(cors());
app.use(express.json());

app.post("/usuario", (req, res) => {
  const data = req.body;
  console.log(data);

  const db = new sqlite3.Database("./database.db");
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      password TEXT
    )`
  );

  db.run(
    `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
    [data.name, data.email, data.password],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Erro ao cadastrar usuário!");
        return;
      }
      console.log("Usuário cadastrado com sucesso!");
      res.send("Usuário cadastrado com sucesso!");
    }
  );
});

app.get("/", (req, res) => {
  res.send("Servidor online!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
