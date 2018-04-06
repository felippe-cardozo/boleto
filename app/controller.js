const express = require('express')
const Boleto = require('./../lib/boleto.js')

const app = express()

app.get('/:bolNumber', (req, res) => {
  const bolNumber = req.params.bolNumber
  try {
    let b = new Boleto(bolNumber).toObject()
    if (!b.válido) {
      res.status(400).json({'error': 'Número de Boleto Inválido'})
    }
    res.status(200).json(b)
  }
  catch(err) {
    res.status(400).json({'error': 'Input não é um número de boleto'})
  }
})

app.listen(3000)
