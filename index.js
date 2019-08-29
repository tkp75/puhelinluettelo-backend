const express = require('express')
const app = express()
const PORT = 3001
const API_BASE = "/api/persons"
const data = {
  "persons":[
    { 
      "name": "Arto Hellas", 
      "number": "040-123456",
      "id": 1
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": 2
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "id": 3
    },
    { 
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122",
      "id": 4
    }
  ]
}

app.get('/', (req, res) => {
  res.send(`<h1>Puhelinluettelo Backend!</h1>
  <p>Service is running at <a href="http://localhost:${PORT}${API_BASE}">${API_BASE}</a></p>`)
})

app.get('/info', (req, res) => {
  res.send(`Phonebook has ${data.persons.length} people<br>${new Date()}`)
})

app.get(API_BASE+"/:id", (req, res) => {
  const id = Number(req.params.id)
  const person = data.persons.find(p => p.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).send(`ERROR: person.id == ${id} did not match with anyone`)
  }
})

app.get(API_BASE, (req, res) => {
  res.json(data)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})