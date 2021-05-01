const Person = require('../DB')

const getAll = () => {
    return Person
        .find({})
        .then(persons => {
            return persons
        })
}
const findById = (id) => {
    return Person.findById(id).then(person => {
        return person
    })
}

module.exports = {getAll,findById}