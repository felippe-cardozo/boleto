const BoletoTitulo = require('./boleto_titulo.js')
const BoletoConvenio = require('./boleto_convenio.js')

class Boleto {
  constructor(bolNumber) {
    if (!this.validate(bolNumber)) {
      throw new InvalidBoleto(bolNumber)
    }
    this.boleto = this.handler(bolNumber)
    this.type = this.boleto instanceof BoletoConvenio ? 'arrecadação' : 'título'
  }

  handler(number) {
    let boleto = number.length === 47 ? 
      new BoletoTitulo(number) : new BoletoConvenio(number)
    return boleto
  }

  toObject() {
    let valid = this.boleto.valid 
    let value = this.boleto.value || 0.00
    let date = this.boleto.date || ''
    let barCode = this.boleto.barCode
    let boleto = {
      'válido': valid,
      'códido de barras': barCode,
      'valor': value,
      'data de validade': date
    }
    return boleto
  }

  validate(number) {
    return (number.length === 47 || (number.length === 48 && number[0] == '8')) && !isNaN(number)
  }
}


class InvalidBoleto extends Error {
  constructor(...args) {
    super(...args)
    Error.captureStackTrace(this, InvalidBoleto)
  }
}

module.exports = Boleto
