const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

// Desafio: criar uma rota [GET] /oi que retorna "Olá, mundo!"
app.get('/oi', function (req, res) {
  res.send('Olá, mundo!')
})

app.listen(3000)
