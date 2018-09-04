const keywords = ["not", "and", "or"]

const KEYWORDS = {
  AND: 'and',
  OR: 'or',
  NOT: 'not'
}

const parseInput = input => {
  const INSIDE_BRACKETS = /\(([aA-zA ]*)\)/g
  const clauses = input.match(INSIDE_BRACKETS)
  return clauses.map(clause => {
    clause = clause.slice(1, -1)
    if(clause.substring('(') >= 0 || clause.substring(')') >= 0){
      return parseInput(clause)
    }
    return clause.split(" ")
  })
}

const input = '(a and b) and (c and (d or e))'

/*
[
  [a, and, b],
  and
  [c, and, [d, or, e]]
]
*/

console.log(parseInput(input))