let data = document.getElementById('data').innerHTML.split('\n').map(line => {
	let matches = /^ *\[ *(\d+-\d+-\d+ *\d+:(\d+)) *\] *(Guard #|)(\d+|wakes|falls)/.exec(line)
	return {
		'timestamp': matches[1],
		'minute': matches[2],
		'message': matches[4]
	}
}).sort((a, b) => (a.timestamp < b.timestamp) ? -1 : 1)

function partA(arr) {
	let current = null
	let sleep = {}
	let output = {total:0}
	for (let event of arr) {
		if (event.message == 'wakes') {
			for (let minute = current.fell; minute < event.minute; minute++) {
				current.total++
				current[minute] = (current[minute] || 0) + 1
				if (current[minute] > current[current.best])
					current.best = minute
			}
			if (current.total > output.total)
				output = current
		}
		else if (event.message == 'falls') {
			current.fell = event.minute
		}
		else {
			current = sleep[event.message] || (sleep[event.message] = {'id':event.message, total:0, best:'none', 'none': 0})
		}
	}
	return parseInt(output.id) * parseInt(output.best)
}

console.log(`A: ${partA(data)}`)
