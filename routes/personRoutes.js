const router = require('express').Router()
const Person = require('../models/Person')


// Create

router.post('/', async (req, res) => {
  // req.body
  // {name:"igor", salary: 2000, approved: true}
  const { name, salary, approved } = req.body; // destructure (recurso do js moderno, criando 3 variaveis de uma vez)

  if (!name) {
    res.status(422).json({ error: "O nome da pessoa não foi enviado!" });
  }

  const person = {
    name,
    salary,
    approved,
  };

  try {
    // chamando a classe Person e passando o obj acima no create
    await Person.create(person);

    res.status(201).json({ message: "Pessoa inserida ao banco com sucesso!" });
  } catch (error) {
    // se der erro, retornamos a msg de erro em json, com o cod 500
    res.status(500).json({ error: error });
  }
});

module.exports = router
 