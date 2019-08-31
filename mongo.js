const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://puhelinluettelo:${password}@fsdev-ctcbm.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: 'Aku Ankka',
  number: '000-313',
  id: 1,
})

person.save().then(response => {
  console.log('person saved!');
  mongoose.connection.close();
})
