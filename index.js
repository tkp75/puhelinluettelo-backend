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
const unknownEndpoint = (req, res) => {
  res.status(404).json( { error: `${req.method} ${req.originalUrl}\nunknown endpoint` } )
}

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return res.status(400)
      .json( { error: `${req.method} ${req.originalUrl}\nmalformatted id` })
  } else if (error.name === 'ValidationError' ) {
    return res.status(400)
      .json( { error: `${req.method} ${req.originalUrl}\n${error.message}` })
  }
  next(error)
}


// MAIN
// - middleware: preprosessors
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
app.get('/info', (req, res, next) => {
  Person.find({})
    .then(persons => {
      if (persons != '') {
        res.send(`Phonebook has ${persons.length} people<br>${new Date()}`)
      } else {
        res.status(404).send(`Phonebook has no people<br>${new Date()}`)
      }
    })
    .catch(error => next(error))
})

app.get(API_BASE, (req, res, next) => {
  Person.find({})
    .then(persons => {
      if (persons != '') {
        res.json(persons.map(person => person.toJSON()))
      } else {
        res.status(404)
          .json( { error: `${req.method} ${req.originalUrl}\nPersons not found` })
      }
    })
    .catch(error => next(error))
})

app.get(API_BASE+"/:id", (req, res, next) => {
  const id = req.params.id
  Person.findById(id)
    .then(person => {
      if (person) {
        res.json(person.toJSON())
      } else {
        res.status(404)
          .json( { error: `${req.method} ${req.originalUrl}\nPerson not found with id ${id}` })
      }
    })
    .catch(error => next(error))
})

// - DELETE methods
app.delete(API_BASE+"/:id", (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id)
    .then(response => {
      if (response) {
        res.status(204).end()
      } else {
        res.status(404)
        .json( { error: `${req.method} ${req.originalUrl}\nPerson not found with id ${id}` })
      }    
    })
    .catch(error => next(error))
})

// - POST methods
app.post(API_BASE, (req, res, next) => {
  const person = new Person({
    name: req.body.name,
    number: req.body.number
  })
  person.save()
    .then(response => response.toJSON())
    .then(jsonResonse => res.json(jsonResonse))
    .catch(error => next(error))
})

// - PUT methods
app.put(API_BASE, (req, res, next) => {
  const id = req.body.id
  const name = req.body.name
  const number = req.body.number
  if (!id) {
    res.status(400)
      .json( { error: `${req.method} ${req.originalUrl}\nid is mandatory for a person modification` })
  }
  Person.findById(id)
    .then(person => {
      if (person) {
        // Person found, modify it
        if (name) person.name = name
        if (number) person.number = number
        person.save()
          .then(response => {
            res.json(response.toJSON())
          })
          .catch(error => next(error))
      } else {
        // Person not found, create it
/* commented out to test mongoose validators
        if (!name || !number) {
          res.status(400
            .json( { error: `${req.method} ${req.originalUrl}\nName and number are mandatory for a person` })    
        }
*/
        const person = new Person({
          id: id,
          name: name,
          number: number
        })
        person.save()
          .then(response => {
            res.json(response.toJSON())
          })
          .catch(error => next(error))
      }
    })
    .catch(error => next(error))
})

// - middleware: ERROR handling
app.use(unknownEndpoint)
app.use(errorHandler)

// - express server LISTEN
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})