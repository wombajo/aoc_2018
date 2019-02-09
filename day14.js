function calculateScore(scores, input, from) {
	let elf_1 = { index: 0, current: 0 }
  let elf_2 = { index: 1, current: 0 }

  for (let i = 0; i < 9 + input; i++) {
  	elf_1.current = findValue(elf_1.index, scores)[1]
    elf_2.current = findValue(elf_2.index, scores)[1]
    let current_score = elf_1.current + elf_2.current
    elf_1.index = findValue(elf_1.index, scores)[0] + elf_1.current + 1
    elf_2.index = findValue(elf_2.index, scores)[0] + elf_2.current + 1
    if (current_score >= 10) {
    	scores.push(...current_score.toString().split('').map((e) => parseInt(e)))
    } else {
    	scores.push(current_score)
    }
  }
  return { 'a': scores.slice(from, from + 10).join('') }
}

function findValue(index, array) {
  return [ index % array.length, array[index % array.length] ]
}

console.log(calculateScore([3,7], 60000, 77201))
