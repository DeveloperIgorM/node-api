const moongose = require('mongoose')

const Person = moongose.model('Person', {
    name: String,
    salary: Number,
    approved: Boolean,
}) 

module.exports = Person