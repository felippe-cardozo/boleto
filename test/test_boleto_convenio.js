const BoletoConvenio = require('./../lib/boleto_convenio.js')
const assert = require('assert')

const boletoNum = '836700000000284000577031002734552009003633460005'
const boletoBarCode = '83670000000284000577030027345520000363346000' 


describe('convert numeric representation to original 44 digits barcode', () => {
  let barCode =  new BoletoConvenio(boletoNum).barCode
  it('should have length 44', () => {
    assert.equal(barCode.length, 44)
  })
  it('should return the expected number', () => {
    assert.equal(barCode, boletoBarCode)
  })
})

describe('gets the right value', () => {
  let value = new BoletoConvenio(boletoNum).value
  it('should return the right value', () => {
    assert.equal(value, '28.40')
  })
})


describe('validate the numerical representation of the "boleto"', () => {
  let bol = new BoletoConvenio(boletoNum)
  let bolInvalidPartialDv = new BoletoConvenio(boletoNum.slice(0, 11) + '2' + boletoNum.slice(12, 48))
  let bolInvalidGeneralDv = new BoletoConvenio(boletoNum.slice(0, 3) + '0' + boletoNum.slice(4, 48))
  it('should validate the partial dvs', () => {
    assert.equal(bol.validateDvs(), true)
    assert.equal(bol.valid, true)
    assert.equal(bolInvalidPartialDv.validateDvs(), false)
    assert.equal(bolInvalidPartialDv.valid, false)
  })
  it('should validate general dv', () => {
    assert.equal(bol.validateGeneralDv(), true)
    assert.equal(bolInvalidGeneralDv.validateGeneralDv(), false)
    assert.equal(bolInvalidGeneralDv.valid, false)

  })
})
