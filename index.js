require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
require('date-utils');
const app = express()
const phonebookService = require('./components/phonebookService')


const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}
app.use(requestLogger)

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

app.get('/info', (request, response) => {
    let now = new Date();
    phonebookService.countAll().then((result) => {
        response.send(`
<p>Phonebook has info for ${result} people</p>
<p>${now}</p>
`)
    })
})

app.get('/api/persons', (request, response) => {
    phonebookService.getAll().then((result) => {
        response.json(result)
    })
})

app.get('/api/persons/:id', (request, response,next) => {
    const id = request.params.id
    phonebookService.findById(id).then((person) => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    }).catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
    let personBody = request.body

    if (!personBody.number || !personBody.name) {
        response.json({error: "name or number must be not null"})
    }

    // if (persons.find(p => p.name === person.name)) {
    //     response.json({ error: 'name must be unique' })
    //     response.status(400).end()
    // }

    const personA = {
        name: personBody.name,
        number: personBody.number
    }

    phonebookService.create(personA).then((result) => {
        response.json(result).status(201).end()
    })

})


app.delete('/api/persons/:id', (request, response,next) => {
    const id = request.params.id

    phonebookService.deletePersonById(id).then((result) => {
        response.json(result).status(204).end()
    }).catch(error => {
        next(error)
    })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})