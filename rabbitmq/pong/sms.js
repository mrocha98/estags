class SMS {
  constructor() {
    this.separator = '_'
    this.keyboard = [
      { value: '0', letters: [' '] },
      { value: '2', letters: ['A', 'B', 'C'] },
      { value: '3', letters: ['D', 'E', 'F'] },
      { value: '4', letters: ['G', 'H', 'I'] },
      { value: '5', letters: ['J', 'K', 'L'] },
      { value: '6', letters: ['M', 'N', 'O'] },
      { value: '7', letters: ['P', 'Q', 'R', 'S'] },
      { value: '8', letters: ['T', 'U', 'V'] },
      { value: '9', letters: ['W', 'X', 'Y', 'Z'] }
    ]
  }

  messageToCode(message = ' ') {
    const messageToArray = message.toUpperCase().split('')

    const codified = messageToArray.map((character, index, elements) => {
      const equivalentKey = this.keyboard.find((key) => key.letters.includes(character))
      const position = equivalentKey.letters.findIndex((letter) => letter === character)

      const repetitions = equivalentKey.value.repeat(position + 1)

      const next = elements[index + 1]

      return equivalentKey.letters.includes(next) ? repetitions + this.separator : repetitions
    })

    return codified.join('')
  }
}

module.exports = new SMS()
