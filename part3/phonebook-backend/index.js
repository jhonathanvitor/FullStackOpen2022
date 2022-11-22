const express = require('express')
const app = express();

app.use(express.json())

let person = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get("/info", (req, res) => {
  const count = person.length
  res.send(`
  <p>Phonebook has info for ${count} people</p>
  <p>${new Date()}</p>
`)
})

app.get('/api/persons', (req, res) => {
    res.json(person)
})

app.get('/api/persons/:id', (req, res) => {
  try {
    const id = Number(req.params.id)
    const Person = person.find(note => note.id === id)
    if (Person == undefined){
      throw new Error()
    }
    res.json(Person)
  } catch (error) {
    res.sendStatus(404).send(console.log("User not found"))
  }
})

app.delete("/api/persons/:id", (req, res) => {
	try {
    const {id} = req.params;
    const Person = person.find(note => note.id === id)
    person.splice(Person, 1)
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post("/api/persons/", (req, res) => {
	try {
    const newPerson = req.body;
    console.log(newPerson)
    res.json(newPerson);
    res.sendStatus(204);

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/persons/:id', function (req, res) {
  var updatePreson = req.person;
  console.log(updatePreson)

});

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})