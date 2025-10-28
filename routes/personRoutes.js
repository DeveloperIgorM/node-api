const router = require("express").Router();
const Person = require("../models/Person");

// CREATE

router.post("/", async (req, res) => {
  // req.body
  const { name, salary, approved } = req.body; // destructure (recurso do js moderno, criando 3 variaveis de uma vez)
  // {name:"igor", salary: 2000, approved: true}

  if (!name) {
    res.status(422).json({ error: "O nome da pessoa não foi enviado!" });
    return;
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

// READ - Leitura de dados
router.get("/", async (req, res) => {
  try {
    const people = await Person.find();

    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Buscando por um usuário especifico de forma dinâmica
// Extrair o dado da requisição pela URL = req.params
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // quero encontrar o usuário que tenha o _id igual o id que venha na requisição req.params
    const person = await Person.findOne({ _id: id });

    if (!person) {
      res.status(422).json({ message: "O usuário não foi encontrado!" });
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// UPDATE - Atualizando dados (PUT, PATCH)
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, salary, approved } = req.body;

  const person = {
    name,
    salary,
    approved,
  };

  try {
    const updatePerson = await Person.updateOne({ _id: id }, person); // entre chaves -> filtro, segundo parametro é a atualização (person)

    if (updatePerson.matchedCount === 0) {
      res.status(422).json({ message: "O usuário não foi encontrado!" });
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
module.exports = router;
