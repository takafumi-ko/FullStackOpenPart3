const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })


const mongoPersonSchema = new mongoose.Schema({
    name:{type:{String},required:true,unique:true},
    number:{type:{String},required:true,unique:false}
})
mongoPersonSchema.plugin(uniqueValidator)

mongoPersonSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports =  mongoose.model('Person', mongoPersonSchema)
