const mongoose = require('mongoose')

// Check command line arguments
if (process.argv.length < 3 || process.argv.length > 5) {
  console.log(`ERROR: incorrect invocation, exiting.\n`
    +`To list all persons on phonebook:\n`
    +`\tnode mongo.js <password>\n`
    +`To list a person with known id:\n`
    +`\tnode mongo.js <password> <id>\n`
    +`To add a person to phonebook:\n`
    +`\tnode mongo.js <password> <name> <phone number>`)
  process.exit(1)
}

// FUNCTIONS
// - Print all persons
const getAll = () => {
  console.log('phonebook:')
  Person.find({})
    .then(result => {
      result.forEach(p => {
        console.log(`${p.name} ${p.number}`)
      })
      mongoose.connection.close()
    })
    .catch(e => {
      console.log(`ERROR:getAll:`,e)
      process.exit(1)
    })
}
// - Print person with id
const getOne = (id) => {
  console.log('person:')
  Person.find({id: {$eq: id}})
    .then(result => {
      result.forEach(p => {
        console.log(`${p.name} ${p.number}`)
      })
      mongoose.connection.close()
    })
    .catch(e => {
      console.log(`ERROR:getOne:`,e)
      process.exit(1)
    })
}
// - Save person into phonebook
const saveOne = (name, number, id) => {
  const person = new Person({
    name: name,
    number: number,
    id: id,
  })
  person.save()
    .then(response => {
      console.log(`added ${name} number ${number} to phonebook`)
      mongoose.connection.close()
    })
    .catch(e => {
      console.log(`ERROR:saveOne:`,e)
      process.exit(1)
    })
}

// MAIN
// - Connect and create Mongoose model
const password = process.argv[2]
const url = `mongodb+srv://puhelinluettelo:${password}@fsdev-ctcbm.mongodb.net/test?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true })
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
})
const Person = mongoose.model('Person', personSchema)

// - select function
switch(process.argv.length) {
  case 3:
    getAll()
    break
  case 4: // (id)
    getOne(process.argv[3])
    break
  case 5: // (name, phone number, id)
    saveOne(process.argv[3],process.argv[4], Math.floor(Math.random() * Number.MAX_SAFE_INTEGER))
    break
}