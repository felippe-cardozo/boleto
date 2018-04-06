const BoletoTitulo = require('./../lib/boleto_titulo.js')
const assert = require('assert')

const boletoNum = '34191090080239773064564055890004174900000152452'
const boletoBarCode = '34191749000001524521090002397730646405589000'


describe('convert boleto numeric representation to original 44 digits number', () => {
    let barCode =  new BoletoTitulo(boletoNum).barCode
  it('should have length 44', () => {
    assert.equal(barCode.length, 44)
  })
  it('should return the expected number', () => {
    assert.equal(barCode, boletoBarCode)
  })
})

describe('gets the right value', () => {
  let value = new BoletoTitulo(boletoNum).value
  it('should return the right value', () => {
    assert.equal(value, '1524.52')
  })
})

describe('gets the right date', () => {
  let bol = new BoletoTitulo(boletoNum)
  it('should return the right date', () => {
    assert.equal(bol.date, '10/4/2018')
  })
  it('works according to bb table', () => {
    const bb = {
      '1000': '3/7/2000',
      '1001': '4/7/2000',
      '1667': '1/5/2002',
      '9999': '21/2/2025'
    }
    for (k in bb) {
      assert.equal(bol.codeToDate(k), bb[k])
    }
  })
})

describe('validate the numerical representation of the "boleto"', () => {
  it('should return true for valid bolNum', () => {
    let bol = new BoletoTitulo('34191090080239773064564055890004174900000152452')
    assert.equal(bol.validateDvs(), true)
    assert.equal(bol.validateGeneralDv(), true)
  })
})
