function createGrid(x, y, serial) {
	let grid = []
	for (let i = 0; i < x; i++) {
		let row = []
		for (let j = 0; j < y; j++) {
			let rack_id = i + 10
			let power_level = ((rack_id * j) + serial) * rack_id
			power_level = getHundredDigit(power_level) - 5
			row.push(power_level)
		}
		grid.push(row)
	}
	return grid
}

function getHundredDigit(value) {
	value = value.toString().split('')
	if (value.length >= 3) {
		return parseInt(value[value.length - 3])
	} else {
		return 0
	}
}

function get3x3Grid(grid, top_x, top_y, size) {
	let top = getPoint(grid, top_x, top_y) +
						getPoint(grid, top_x, top_y + 1) +
						getPoint(grid, top_x, top_y + 2)//above row

	let mid = getPoint(grid, top_x + 1, top_y) +
						getPoint(grid, top_x + 1, top_y + 1) +
						getPoint(grid, top_x + 1, top_y + 2)//same row

	let bot = getPoint(grid, top_x + 2, top_y) +
						getPoint(grid, top_x + 2, top_y + 2) +
						getPoint(grid, top_x + 2, top_y + 2)//below row
	return top + mid + bot
}

function getPoint(grid, x, y) {
	return (grid[x] && grid[y]) ? grid[x][y] : 0
}

function getChunks(grid) {
	let chunks = {}
	for (let x = 0; x < grid.length; x++) {
		for (let y = 0; y < grid[x].length; y++) {
			let id = x + ',' + y
			chunks[id] = get3x3Grid(grid, x, y)
		}
	}
	return Object.keys(chunks).reduce(function(a, b){ return chunks[a] > chunks[b] ? a : b })
}

let grid = createGrid(300, 300, 8199)
console.log(`A: ${getChunks(grid)}`)
