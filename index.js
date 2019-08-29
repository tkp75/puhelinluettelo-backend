const express = require('express')
const bodyParser = require('body-parser')
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

const errMsg = (operation, endpoint) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="utf-8">
    <title>Error</title>
    </head>
    <body>
    <pre>Cannot ${operation} ${endpoint}</pre>
    </body>
    </html>
    `

app.use(bodyParser.json())

/*
    GET
*/

app.get('/', (req, res) => {
  res.send(`<h1>Puhelinluettelo Backend!</h1>
  <p>Service is running at <a href="http://localhost:${PORT}${API_BASE}">${API_BASE}</a></p>`)
})

app.get('/info', (req, res) => {
  res.send(`Phonebook has ${data.persons.length} people<br>${new Date()}`)
})

app.get(API_BASE, (req, res) => {
  res.json(data)
})

app.get(API_BASE+"/:id", (req, res) => {
  const id = Number(req.params.id)
  const person = data.persons.find(p => p.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).send(errMsg(req.method, req.originalUrl))
  }
})

/*
    DELETE
*/

app.delete(API_BASE+"/:id", (req, res) => {
  const id = Number(req.params.id)
  const person = data.persons.find(p => p.id === id)
  if (person) {
    data.persons = data.persons.filter(p => p.id != person.id)
    res.status(204).end()
  } else {
    res.status(404).send(errMsg(req.method, req.originalUrl))
  }
})

/*
    POST
*/

app.post(API_BASE, (req, res) => {
  console.log("POST: body=",req.body)
  console.log("POST: name=",req.body.name)
  console.log("POST: number=",req.body.number)
  console.log("POST: id=",req.body.id)
  if (req.body.name && req.body.number
    && !data.persons.find(p => p.name === req.body.name)) {
    const person = { "name": req.body.name, "number": req.body.number }
    person.id=Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
    data.persons.push(person)
    res.json(person)
  } else {
    res.status(404).send(errMsg(req.method, req.originalUrl))
  }
})


/*
    LISTEN
*/
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})