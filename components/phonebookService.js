const Person = require('../DB')

const countAll = () => {
    return Person.count()
}

const getAll = () => {
    return Person.find({})
}
const findById = (id) => {
    return Person.findById(id)
}

const findByNameOneAndUpdate = (person) => {
    return Person.findOneAndUpdate({name: person.name}, person, { new: true })
}

const create = (person) => {
    return Person.create(person)
}

const deletePersonById = (id) => {
    return Person.findByIdAndRemove(id)
}


module.exports = {countAll, getAll, findById, create, findByNameOneAndUpdate,deletePersonById}
