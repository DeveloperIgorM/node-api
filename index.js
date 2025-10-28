// Configuração inicial
require('dotenv').config() // Chamando dotenv
const express = require("express");
const mongoose = require("mongoose");
const app = express(); // usando


// Forma de ler JSON / middlewares
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Declarado esse trecho, agora podemos ler e retornar json
app.use(express.json());

// Rotas da API 
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes);


// Rota inicial / endpoint
app.get('/', (req, res) => {
  // mostrar req

  res.json({ message: "Oi express!" });
});


const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

// Entregar uma porta
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.mrq4fzk.mongodb.net/?retryWrites=true&w=majority&appName=databaseapi`
  )
  .then(() => {
    console.log("Conectamos ao MongoDB");
    app.listen(3000); //escutando essa porta
  })
  .catch((err) => console.log(err));




