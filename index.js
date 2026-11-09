import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

// Em módulos ES não existe __dirname, então ele é recriado aqui
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração do EJS e da pasta de templates
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Dados iniciais (array no servidor)
const times = [
  { id: 1, nome: "Grêmio", estadio: "Arena do Grêmio", cidade: "Porto Alegre" },
  { id: 2, nome: "Internacional", estadio: "Beira-Rio", cidade: "Porto Alegre" },
  { id: 3, nome: "Juventude", estadio: "Alfredo Jaconi", cidade: "Caxias do Sul" },
  { id: 4, nome: "Caxias", estadio: "Centenário", cidade: "Caxias do Sul" },
];

// GET / - página inicial
app.get("/", (req, res) => {
  res.render("index", {
    mensagem: "Bem-vindo ao Catálogo de Times!",
  });
});

// GET /times - lista de times
app.get("/times", (req, res) => {
  res.render("times", { times });
});

// GET /times/:id - detalhes de um time
app.get("/times/:id", (req, res) => {
  // Parâmetros da URL chegam como texto, então convertemos para número
  const id = Number(req.params.id);
  const time = times.find((t) => t.id === id);

  if (!time) {
    return res.status(404).send("Time não encontrado.");
  }

  res.render("detalhe", { time });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});