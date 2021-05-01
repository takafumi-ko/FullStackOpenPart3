require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
require('date-utils');
const app = express()
const phonebookService = require('./components/phonebookService')

morgan.token('data', (req, res) => {
    if (req.method === "POST") {
        req.body.number = "000-000-0000"
        return JSON.stringify(req.body)
    }
    return null
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(express.json())

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

// app.get('/info', (request, response) => {
//     const numOfPersons = persons.length
//     let now = new Date();
//     response.send(`
// <p>Phonebook has info for ${numOfPersons} people</p>
// <p>${now}</p>
// `)
// })

app.get('/api/persons', (request, response) => {
    phonebookService.getAll().then((result)=>{
        response.json(result)
    })
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    phonebookService.findById(id).then((person)=>{
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    }).catch(()=>{
        response.status(500).end()
    })
})

// app.post('/api/persons', (request, response) => {
//     let person = request.body
//
//     if (!person.number || !person.name) {
//         response.json({error:"name or number must be not null"})
//     }
//
//     if (persons.find(p => p.name === person.name)) {
//         response.json({ error: 'name must be unique' })
//         response.status(400).end()
//     }
//     const person = new Person
//
//     person = {...person, id: Math.random()}
//     console.log(person)
//     persons = persons.concat(person)
//
//     response.json(person).status(201).end()
// })
//
// app.delete('/api/persons/:id', (request, response) => {
//     const id = Number(request.params.id)
//
//     const newPersons = persons.filter(person => person.id !== id)
//     console.log(newPersons)
//     if (persons.length > newPersons.length) {
//         persons = newPersons
//         response.status(204).end()
//     } else {
//         response.status(404).end()
//     }
// })


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})