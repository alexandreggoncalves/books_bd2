const express = require('express') // importando o modulo express
const router = express.Router()
const Book = require('../models/book.model') // importação do model
const { title } = require('process')

// consulta
router.get('/', (req, res) => { 
    Book.find().lean()
    .then(data => {
        res.render('books/list', { books: data})
    })
    .catch(err => 
        console.log('erro ao processar a operação: \n', err)
    )
})

router.get('/addOrEdit', (req, res) => {
    res.render('books/addOrEdit')
})

// inserir
router.post('/addOrEdit', (req, res) => {
    const book = {
        title: req.body.title,
        author: req.body.author, 
        publisher: req.body.publisher, 
        publishedYear: req.body.publishedYear,
        price: req.body.price,
    }
    const { _id} = req.body
    if(_id == '')
        new Book({...book}).save()
    .then(data => res.redirect('/books'))
    .catch(err => console.log('erro durante a insersão de dados: \n', err))
    else
    Book.findByIdAndUpdate(_id, book)
    .then(data => res.redirect('/books'))
    .catch(err => console.log('erro durante a atualização de dados: \n', err))
})

//editar
router.get('/addOrEdit/:id', (req, res) => {
    Book.findById(req.params.id).lean()
    .then( data => res.render('books/addOrEdit', { book: data }))
    .catch(err =>
        console.log('Erro ao recuperar dados do id especificado', err))
})

//rota delete
router.get('/delete/:id', (req, res) => {
    Book.findByIdAndDelete(req.params.id)
    .then(data => res.render('books/list', { delete: true}))
    .catch(err => console.log('erro ao remover o arquivo:\n', err))
}) 

module.exports = router