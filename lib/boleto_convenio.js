class BoletoConvenio {
  constructor(bolNumber) {
    this.bolNumber = bolNumber
    this.barCode = this.toBarCode()
    this.value = this.findValue()
    this.valid = this.validate()
  }
  
  findValue() {
    let value = this.barCode.slice(4, 13) + '.' + this.barCode.slice(13, 15)
    if (value.split('').every(i => i === '0')) { return '0.00' }
    return parseFloat(value).toFixed(2)
  }

  toBarCode() {
    let dvIndexes = [11, 23, 35, 47]
    return this.bolNumber.split('').filter((e, i) => 
      !dvIndexes.includes(i)).join('')
  }

  // Validation

  validate() {
    return this.validateDvs() && this.validateGeneralDv()
  }

  validateGeneralDv() {
    let barCodeWithoutDv = this.barCode.split('')
    let actualDv = barCodeWithoutDv.splice(3, 1)[0]
    let validDv = this.genDv(barCodeWithoutDv)
    return actualDv === validDv
  }

  // setup the 4 fields used to calculate the dvs
  validateDvs() {
    let dvs = this.getDvs()
    let actualDvs = [this.bolNumber[11], this.bolNumber[23],
      this.bolNumber[35], this.bolNumber[47]] 
    return dvs.join('') === actualDvs.join('')
  }

  getDvs() {
    let indexes = [[0, 11], [12, 23], [24, 35], [36, 47]]
    let fields = indexes.map(i => this.bolNumber.slice(i[0], i[1]).split(''))
    return fields.map(i => this.genDv(i))
  }

  genDv(field) {
    let calcField = field.reverse().map((element, index) => {
      element = index % 2 === 0 ? (parseInt(element) * 2).toString() : element
      return element
    })
    calcField = calcField.map(e => {
      e = e.length == 1 ? e : (parseInt(e[0]) + parseInt(e[1])).toString()
      return e
    })
    let dvSum = calcField.reduce((a, b) => parseInt(a) + parseInt(b))
    let rest = dvSum % 10
    return (((parseInt((dvSum + 10) / 10) * 10) - rest) % 10).toString()
  } 
}


module.exports = BoletoConvenio
