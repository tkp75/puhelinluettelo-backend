// IMPORT
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')


// CONSTANTS
const app = express()
const PORT = process.env.PORT || 3001
const API_BASE = "/api/persons"


// VARIABLES
let persons = [
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


// FUNCTIONS
const errMsg = (operation, endpoint, text) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot ${operation} ${endpoint}
${text}</pre>
</body>
</html>
`


// MAIN
// - middleware definitions
app.use(cors())
app.use(bodyParser.json())
app.use(morgan((tokens, req, res) => {
  if (req.method === 'POST') {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      JSON.stringify(req.body)
    ].join(' ')
  } else {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
    ].join(' ')
  }
}))
app.use(express.static('build'))

// - GET methods
/* Disabled "/" as frontend will use it
app.get('/', (req, res) => {
  res.send(`<h1>Puhelinluettelo Backend!</h1>
  <p>Service is running at <a href="http://localhost:${PORT}${API_BASE}">${API_BASE}</a></p>`)
})
*/

app.get('/info', (req, res) => {
  res.send(`Phonebook has ${persons.length} people<br>${new Date()}`)
})

app.get(API_BASE, (req, res) => {
  res.json(persons)
})

app.get(API_BASE+"/:id", (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).send(errMsg(req.method, req.originalUrl,
      `Person not found with id ${id}`))
  }
})

// - DELETE methods
app.delete(API_BASE+"/:id", (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  if (person) {
    persons = persons.filter(p => p.id != person.id)
    res.status(204).end()
  } else {
    res.status(404).send(errMsg(req.method, req.originalUrl,
      `Person not found with id ${id}`))
  }
})

// - POST methods
app.post(API_BASE, (req, res) => {
const name = req.body.name
const number = req.body.number
if (name && number) {
    if (persons.find(p => p.name === name)) {
      res.status(404).send(errMsg(req.method, req.originalUrl,
        `Person with name ${name} already exists`))
      return
    }
    const person = { "name": name, "number": number }
    person.id=Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
    persons.push(person)
    res.json(person)
  } else {
    res.status(404).send(errMsg(req.method, req.originalUrl,
      `Name and number are mandatory for a person`))
  }
})

// - express server LISTEN
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})