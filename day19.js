/* Remove first line of input for this to work. '#ip 2' */

let data = document.getElementById('data').innerHTML.split('\n').map(function(line) {
	let matches = /([a-z]+) (\d+ \d+ \d+)/g.exec(line);
	return {
		opcode: matches[1],
		A: parseInt(matches[2].split(' ')[0]),
		B: parseInt(matches[2].split(' ')[1]),
		C: parseInt(matches[2].split(' ')[2])
	}
})

let registers_a = {
	pointer: 2,
	registers: [0, 0, 0, 0, 0, 0],
	data: data,
	inst_pointer: 2
}

let registers_b = {
	pointer: 2,
	registers: [1, 0, 0, 0, 0, 0],
	data: data,
	inst_pointer: 2
}

const opcodes = {
	addr: (a, b, c, regs) => { regs.registers[c] = regs.registers[a] + regs.registers[b] },
	addi: (a, b, c, regs) => { regs.registers[c] = regs.registers[a] + b },
	mulr: (a, b, c, regs) => { regs.registers[c] = regs.registers[a] * regs.registers[b] },
	muli: (a, b, c, regs) => { regs.registers[c] = regs.registers[a] * b },
	banr: (a, b, c, regs) => { regs.registers[c] = regs.registers[a] & regs.registers[b] },
	bani: (a, b, c, regs) => { regs.registers[c] = regs.registers[a] & b },
	borr: (a, b, c, regs) => { regs.registers[c] = regs.registers[a] | regs.registers[b] },
	bori: (a, b, c, regs) => { regs.registers[c] = regs.registers[a] | b },
	setr: (a, b, c, regs) => { regs.registers[c] = regs.registers[a] },
	seti: (a, b, c, regs) => { regs.registers[c] = a },
	gtir: (a, b, c, regs) => { regs.registers[c] = a > regs.registers[b] ? 1 : 0 },
	gtri: (a, b, c, regs) => { regs.registers[c] = regs.registers[a] > b ? 1 : 0 },
	gtrr: (a, b, c, regs) => { regs.registers[c] = regs.registers[a] > regs.registers[b] ? 1 : 0 },
	eqir: (a, b, c, regs) => { regs.registers[c] = a === regs.registers[b] ? 1 : 0 },
	eqri: (a, b, c, regs) => { regs.registers[c] = regs.registers[a] === b ? 1 : 0 },
	eqrr: (a, b, c, regs) => { regs.registers[c] = regs.registers[a] === regs.registers[b] ? 1 : 0 },
	setP: (regs) => { regs.registers[regs.inst_pointer]++}
}

function doStuff(regs, arr) {
	let iterations = 0
	while (true) {
		regs.pointer = regs.registers[regs.inst_pointer]
		if (regs.pointer >= (arr.length - 1)) {
			break
		}
		opcodes[arr[regs.pointer].opcode](arr[regs.pointer].A, arr[regs.pointer].B, arr[regs.pointer].C, regs)
		opcodes.setP(regs)
		iterations++
	}
	regs.iterations = iterations
	return regs
}

doStuff(registers_a, registers_a.data)
console.log(`A: ${registers_a.registers[0]}`)
doStuff(registers_b, registers_b.data)
console.log(`B: ${registers_b.registers[0]} (not correct)`)
