const keywords = ["not", "and", "or"]
// const and = (x, y) => x && y
// const or = (x, y) => x || y
// const not = x => !x

const parseInput = ({ input }) => {
  let output = []
  //input is split into arrays
  const chars = input.replace(/ and /g, "&").replace(/ or /g, "|").replace(/not /g, "!").split('')

  
  let curIndex = 0
  while(curIndex <= input.length){
    const char = input[curIndex]
    if(char === '('){
      const nextInput = chars.slice(curIndex + 1).join('')
      output.push(
        parseInput({
          input: nextInput
        })
      )
      curIndex = (curIndex + 1) + nextInput.indexOf(')')
    } else if (char === ')') {
      return output
    } else {
      output.push(char)
    }
    curIndex++
  }
  return output
}

const generatePermutations = (variables = ['a', 'b', 'c']) => {
  let output = []
  for(let rows = 0; rows < Math.pow(2, variables.length); rows++){
    const combination = {}
    for(let i = 0; i < variables.length; i++){
      combination[variables[i]] = (rows * i) % 2 === 0
    }
    output.push(combination)
  }
  return output
}

// console.log(JSON.stringify(parseInput({ input }), null, 2))
// console.log(generatePermutations())

/*

  [ { a: false, b: false, c: false },
  { a: true, b: false, c: false },
  { a: false, b: true, c: false },
  { a: true, b: true, c: false },
  { a: false, b: false, c: true },
  { a: true, b: false, c: true },
  { a: false, b: true, c: true },
  { a: true, b: true, c: true } ]

*/

const input = '(a & b) & (c & (d & e))'

// console.log(JSON.stringify(parseInput({ input }), null, 2))
// test eval:
// const STATEMENT = [[true, '&', false], '&', [false, '&', [true, '|', false]]]
// console.log(eval(STATEMENT))

const shunting_yard = (input) => {
  let stack = []
  let queue = []
  const operators = ['!', '&', '|']

  while (input.length > 0) {
    const el = input.shift()
    if (operators.includes(el)) {
      while (stack.slice(-1)[0] === '!' && stack.slice(-1)[0] !== '(') {
        const toPop = stack.pop()
        if(!toPop){
          throw Error('oh noes')
        }
        queue.push(toPop)
      }
      stack.push(el)
    } else if (el === ')') {
      while(stack.slice(-1)[0] !== '(' && stack) {
        const toPop = stack.pop()
        if(!toPop){
          throw Error('oh noes')
        }
        queue.push(toPop)
      }
      stack.pop()
    } else if (el === '(') {
      stack.push(el)
    } else {
      queue.push(el)
    }
  }
  return queue.concat(stack.reverse())
}

const evaluator = inputArray => {
    // 
    let output = []
    while (inputArray.length > 0) {
        const first = inputArray.shift()
        if(first === '!') {
            const last = output.pop()
            output.push(!last)
        } else if (first === '&') {
            const last1 = output.pop()
            const last2 = output.pop()
            output.push(last1 && last2)
        } else if (first === '|') {
            const last1 = output.pop()
            const last2 = output.pop()
            output.push(last1 || last2)
        } else {
            output.push(first)
        }
    }
    return output[0]
}

const shunted = [true, true, '&', false, true, false, '|', '&', '&']
evaluator(shunted)