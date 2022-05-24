// config inicial
const express = require('express')
const cors = require("cors")
const app = express()

// depois do db
const mongoose = require('mongoose')

const User = require('./models/User')

app.use(cors())

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

// rotas
app.post('/users', async (req, res) => {
  const {   
    name,
    age,
    language,
    operationArea, 
    professionalSituation, 
    experience, 
    linkedin, 
    github } = req.body

  const user = {
    name,
    age,
    language,
    operationArea, 
    professionalSituation, 
    experience, 
    linkedin, 
    github
  }

  try {
    await User.create(user)

    res.status(201).json(user, { message: 'Pessoa inserida no sistema com sucesso!' })
    
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.get('/users', async (req, res) => {
  try {
    const people = await User.find()

    res.status(200).json(people)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.get('/users/:id', async (req, res) => {
  const id = req.params.id

  try {
    const user = await User.findOne({ _id: id })

    if (!user) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.patch('/users/:id', async (req, res) => {
  const id = req.params.id

  const { 
    name,
    age,
    language,
    operationArea, 
    professionalSituation, 
    experience, 
    linkedin, 
    github } = req.body

  const user = {
    name,
    age,
    language,
    operationArea, 
    professionalSituation, 
    experience, 
    linkedin, 
    github
  }

  try {
    const updatedUser = await User.updateOne({ _id: id }, user)

    if (updatedUser.matchedCount === 0) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.delete('/users/:id', async (req, res) => {
  const id = req.params.id

  const user = await User.findOne({ _id: id })

  if (!user) {
    res.status(422).json({ message: 'Usuário não encontrado!' })
    return
  }

  try {
    await User.deleteOne({ _id: id })

    res.status(200).json({ message: 'Usuário removido com sucesso!' })
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.get('/', (req, res) => {
  res.json({ message: 'Oi Express!' })
})

mongoose
  .connect(
    'mongodb+srv://alemaobrk1:alemaobrk1@cluster0.nztnmoj.mongodb.net/?retryWrites=true&w=majority',
  )
  .then(() => {
    console.log('Conectou ao banco!')
    app.listen(3333)
  })
  .catch((err) => console.log(err))
