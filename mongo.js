const mongoose = require('mongoose')


if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}


const url = 'YOUR URL'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })


const personSchema = new mongoose.Schema({
    name:String,
    number:String
})

const Person = mongoose.model('Person', personSchema)


if(process.argv.length === 3){
    Person
        .find({})
        .then(persons => {
            persons.forEach(person => {
                console.log(person.name,person.number)
            })
            mongoose.connection.close()
            process.exit(1)
        })
}else if(process.argv.length === 5){
    const person = new Person({
        name: process.argv[3],
        number:process.argv[4],
    })
    person.save().then(result => {
        console.log('added',result.name,'number',result.number,'to phonebook')
        mongoose.connection.close()
        process.exit(1)
    })
}else{
    mongoose.connection.close()
    console.error('arg length should be 3 or 5')
    process.exit(1)
}
