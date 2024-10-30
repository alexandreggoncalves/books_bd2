const mongoose = require('mongoose') // importação do modulo mongoose

module.exports = mongoose.model('Book', {
    title: String,
    author: String, 
    publisher: String, 
    publishedYear: Number, 
    price: Number,
})