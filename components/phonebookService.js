const Person = require('../DB')

const countAll = ()=>{
    return Person.count().then(result=>{
        return result
    })
}

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

const create = (person)=>{
    return Person.create(person).then((result)=>{
        return result
    })
}

const deletePersonById = (id)=>{
    return Person.findByIdAndRemove(id)
}

module.exports = {countAll,getAll,findById,create,deletePersonById}
