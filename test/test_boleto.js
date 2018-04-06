const Boleto = require('./../lib/boleto.js')
const assert = require('assert')

const boletoTitulo = '34191090080239773064564055890004174900000152452'
const boletoConvenio = '836700000000284000577031002734552009003633460005'

describe('it validates for malformed input', () => {
  it('should throw error for non numeric input', () => {
    assert.throws(() => {new Boleto(new Array(48).join('a'))}, Error, 'Invalid Number')
  })
  it('should throw error for wrong length', () => {
    assert.throws(() => {new Boleto(new Array(47).join('0'))}, Error, 'Invalid Number')
    assert.throws(() => {new Boleto(new Array(50).join('0'))}, Error, 'Invalid Number')
  })
  it('should throw error for input of length 48 that does not starts with "8"', () => {
    assert.throws(() => {new Boleto(new Array(49).join('0'))}, Error, 'Invalid Number')
  })
})

describe('handler calls the right class', () => {
  let bolTitulo = new Boleto(boletoTitulo)
  let bolConvenio = new Boleto(boletoConvenio)
  it('calls the right class', () => {
    assert.equal(bolTitulo.type, 'título')
    assert.equal(bolConvenio.type, 'arrecadação')
  })
})
