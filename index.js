// IMPORTS
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const Person = require('./models/person')


// CONSTANTS
const app = express()
const PORT = process.env.PORT
const API_BASE = "/api/persons"


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
app.get('/info', (req, res) => {
  Person.find({})
    .then(persons => {
      if (persons) {
        res.send(`Phonebook has ${persons.length} people<br>${new Date()}`)
      } else {
        res.status(404).send(`Phonebook has no people<br>${new Date()}`)
      }
    })
    .catch(error => {
      console.log(error)
      res.status(400).send(errMsg(req.method, req.originalUrl,
        `Persons not found`))
    })
})

app.get(API_BASE, (req, res) => {
  Person.find({})
    .then(persons => {
      if (persons) {
        res.json(persons.map(person => person.toJSON()))
      } else {
        res.status(404).send(errMsg(req.method, req.originalUrl,
          `Persons not found`))  
      }
    })
    .catch(error => {
      console.log(error)
      res.status(400).send(errMsg(req.method, req.originalUrl,
        `Persons not found`))
    })
})

app.get(API_BASE+"/:id", (req, res) => {
  const id = req.params.id
  Person.find({_id: {$eq: id}})
    .then(persons => {
      if (persons.length != 1) {
        res.status(404).send(errMsg(req.method, req.originalUrl,
          `Person not found with id ${id}`))
      } else {
        res.json(persons.map(person => person.toJSON()))
      }
    })
    .catch(error => {
      console.log(error)
      res.status(400).send(errMsg(req.method, req.originalUrl,
        `Person not found with id ${id}`))
  })
})

// - DELETE methods
app.delete(API_BASE+"/:id", (req, res) => {
  const id = req.params.id
  Person.deleteOne({_id: {$eq: id}})
    .then(response => {
//    console.log(`deleted id ${id} from phonebook`)
//    console.log('delete response',response)
      if (response.deletedCount === 1) {
        res.status(204).end()
      } else {
        res.status(404).send(errMsg(req.method, req.originalUrl,
          `Person not found with id ${id}`))
      }    
    })
    .catch(error => {
      console.log(error)
      res.status(400).send(errMsg(req.method, req.originalUrl,
        `Person not found with id ${id}`))
      })
})

// - POST methods
app.post(API_BASE, (req, res) => {
  const name = req.body.name
  const number = req.body.number
  if (name && number) {
    const person = new Person({
      name: name,
      number: number
    })
    person.save()
      .then(response => {
//      console.log('DEBUG:',response)
//      console.log(`added ${name} with number ${number} to phonebook`)
        res.json(response.toJSON())
      })
      .catch(error => {
        console.log(error)
        res.status(400).send(errMsg(req.method, req.originalUrl,
          `failed to add ${name} with number ${number} to phonebook`))
        })
    } else {
    res.status(400).send(errMsg(req.method, req.originalUrl,
      `Name and number are mandatory for a person`))
  }
})

// - express server LISTEN
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})