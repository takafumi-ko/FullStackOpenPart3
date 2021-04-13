const express = require('express')
require('date-utils');
const app = express()
app.use(express.json())

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    const numOfPersons = persons.length
    let now = new Date();
    response.send(`
<p>Phonebook has info for ${numOfPersons} people</p>
<p>${now}</p>
`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.post('/api/persons', (request, response) => {
    let person = request.body

    if (!person.number || !person.name) {
        response.json({error:"name or number must be not null"})
    }

    if (persons.find(p => p.name === person.name)) {
        response.json({ error: 'name must be unique' })
        response.status(400).end()
    }

    person = {...person, id: Math.random()}
    console.log(person)
    persons = persons.concat(person)

    response.json(person).status(201).end()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)

    const newPersons = persons.filter(person => person.id !== id)
    console.log(newPersons)
    if (persons.length > newPersons.length) {
        persons = newPersons
        response.status(204).end()
    } else {
        response.status(404).end()
    }
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})