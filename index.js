const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')

const dbUrl = 'mongodb+srv://admin:JHy9QG6y9kLJItWK@cluster0.jg2n1i9.mongodb.net'
const dbName = 'ocean-jornada-backend-maio-2024'

const client = new MongoClient(dbUrl)

async function main() {
  console.log('Conectando ao banco de dados...')
  await client.connect()
  console.log('Banco de dados conectado com sucesso!')

  const app = express()

  app.get('/', function (req, res) {
    res.send('Hello World')
  })

  // Desafio: criar uma rota [GET] /oi que retorna "Olá, mundo!"
  app.get('/oi', function (req, res) {
    res.send('Olá, mundo!')
  })

  // Lista de Itens
  const itens = ['Rick Sanchez', 'Morty Smith', 'Summer Smith']
  //              0               1              2

  const db = client.db(dbName)
  const collection = db.collection('item')

  // Endpoint de Read All [GET] /item
  app.get('/item', async function (req, res) {
    // Acesso a lista de documentos na collection
    const documentos = await collection.find().toArray()

    // Envio os documentos como resposta
    res.send(documentos)
  })

  // Endpoint de Read By ID [GET] /item/:id
  app.get('/item/:id', async function (req, res) {
    // Acessamos o parâmetro de rota ID
    const id = req.params.id

    // Acessamos o item na collection usando o ID
    const item = await collection.findOne({ _id: new ObjectId(id) })

    // Enviamos o item encontrado como resposta
    res.send(item)
  })

  // Sinalizamos que todo corpo de requisição
  // virá como JSON
  app.use(express.json())

  // Endpoint de Create [POST] /item
  app.post('/item', function (req, res) {
    // Acessamos o corpo da requisição
    const body = req.body

    // Acessar o item no corpo da requisição
    const novoItem = body.nome

    // Adicionar o novo item na collection
    collection.insertOne({ nome: novoItem })

    // Enviar uma mensagem de sucesso
    res.send('Item adicionado com sucesso: ' + novoItem)
  })

  // Endpoint de Update [PUT] /item/:id
  app.put('/item/:id', async function (req, res) {
    // Acessar o ID do parâmetro de rota
    const id = req.params.id

    // Acessar o item a ser atualizado, a partir do
    // corpo da requisição
    const body = req.body
    const atualizarItem = body.nome

    // Atualizar na collection o item recebido
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { nome: atualizarItem } }
    )

    // Enviamos uma mensagem de sucesso
    res.send('Item atualizado com sucesso: ' + id + ', ' + atualizarItem)
  })

  // Endpoint de Delete [DELETE] /item/:id
  app.delete('/item/:id', async function (req, res) {
    // Acessar o parâmetro de rota ID
    const id = req.params.id

    // Executa a operação de exclusão desse item na collection
    await collection.deleteOne({ _id: new ObjectId(id) })

    // Enviamos uma mensagem de sucesso
    res.send('Item removido com sucesso: ' + id)
  })

  app.listen(3000)
}

main()
