class BoletoTitulo {
  constructor(bolNumber) {
    this.bolNumber = bolNumber
    this.barCode = this.toBarCode(this.bolNumber)
    this.value = this.findValue()
    this.date = this.findDate()
    this.valid = this.validate()
  }
  
  findValue() {
    let value = this.barCode.slice(9, 19)
    value = value.slice(0, 8) + '.' + value.slice(8, 10)
    if (value.split('').every(i => i === '0')) {return '0.00'} 
    return parseFloat(value).toFixed(2)
  }

  findDate() {
    const dateCode = this.barCode.slice(5, 9)
    if (dateCode.split('').every(i => i === '0')) {return null}
    return this.codeToDate(dateCode)
  }

  // the dateCode represents the number of days to add from the baseDate, plus one
  codeToDate(dateCode) {
    const baseDate = new Date(1997, 9, 7)
    const date = new Date(baseDate.getTime() + (parseInt(dateCode) + 1)
      * 86400000)
    return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/')
  }

  toBarCode(number) {
    let sliceIndexes = [[0, 4], [32, 33], [33, 47], [4, 9], [10, 20], [21, 31]]
    let barCode = sliceIndexes.map(i => number.slice(i[0], i[1]))
    return barCode.join('')
  }

  // Validation


  validate() {
    return this.validateDvs() && this.validateGeneralDv()
  }

  // setup the 3 fields used to calculate the dvs
  getDvs() {
    let fields = []
    fields.push((this.barCode.slice(0, 4) + 
      this.barCode.slice(19,24)).split(''))
    fields.push(this.barCode.slice(24, 34).split(''))
    fields.push(this.barCode.slice(34, 44).split(''))
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

  validateDvs() {
    let dvs = this.getDvs()
    let actualDvs = [this.bolNumber[9], this.bolNumber[20], this.bolNumber[31]] 
    return dvs.join('') === actualDvs.join('')
  }

  validateGeneralDv() {
    let bolNum = (this.barCode.slice(0, 4) +
      this.barCode.slice(5, 44)).split('')
    let factors = [2, 3, 4, 5, 6, 7, 8, 9]
    let count = 0
    let results = []
    bolNum.reverse().forEach(e => {
      results.push(parseInt(e) * factors[count])
      count++
      count = count > 7 ? 0 : count
    })
    let result = 11 - (results.reduce((a, b) => a + b) % 11)
    result = [11, 10, 0].includes(result) ? 0 : result
    return result.toString() === this.barCode[4]
  }
}

module.exports = BoletoTitulo
