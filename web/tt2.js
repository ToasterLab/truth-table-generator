const keywords = ["not", "and", "or"]

const parseInput = ({ input }) => {
  let output = []
  const chars = input.split('')
  
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

const input = '(a and b) and (c and (d or e))'

console.log(JSON.stringify(parseInput({ input }), null, 2))