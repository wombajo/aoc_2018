let data = document.getElementById('data').innerHTML.split('\n\n').map(function(line) {
    let regex = /\[(.+)\]\n(\d+(?:\s+\d+){3})\n.*\[(.+)\]/g
    let matches = regex.exec(line)
    if (matches) {
        return {
            'before': matches[1].trim().split(',').map(e => parseInt(e)),
            'instruction': {
                'opcode': parseInt(matches[2].split(' ')[0]),
                'A': parseInt(matches[2].split(' ')[1]),
                'B': parseInt(matches[2].split(' ')[2]),
                'C': parseInt(matches[2].split(' ')[3])
            },
            'after': matches[3].trim().split(',').map(e => parseInt(e))
        }
    }
})

const opcodes = {
    addr: (a, b, c, regs) => { regs[c] = regs[a] + regs[b] },
    addi: (a, b, c, regs) => { regs[c] = regs[a] + b },
    mulr: (a, b, c, regs) => { regs[c] = regs[a] * regs[b] },
    muli: (a, b, c, regs) => { regs[c] = regs[a] * b },
    banr: (a, b, c, regs) => { regs[c] = regs[a] & regs[b] },
    bani: (a, b, c, regs) => { regs[c] = regs[a] & b },
    borr: (a, b, c, regs) => { regs[c] = regs[a] | regs[b] },
    bori: (a, b, c, regs) => { regs[c] = regs[a] | b },
    setr: (a, b, c, regs) => { regs[c] = regs[a] },
    seti: (a, b, c, regs) => { regs[c] = a },
    gtir: (a, b, c, regs) => { regs[c] = a > regs[b] ? 1 : 0 },
    gtri: (a, b, c, regs) => { regs[c] = regs[a] > b ? 1 : 0 },
    gtrr: (a, b, c, regs) => { regs[c] = regs[a] > regs[b] ? 1 : 0 },
    eqir: (a, b, c, regs) => { regs[c] = a === regs[b] ? 1 : 0 },
    eqri: (a, b, c, regs) => { regs[c] = regs[a] === b ? 1 : 0 },
    eqrr: (a, b, c, regs) => { regs[c] = regs[a] === regs[b] ? 1 : 0 },
}

function isEqual(a, b) {
    if (a.length != b.length)
        return false
    for (let i = 0; i < a.length; i++) {
        if (a[i] != b[i])
            return false
    }
    return true
}

function countSamples(arr, codes) {
    let result = 0
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == null) continue
        let possible = 0
        for (let key in codes) {
            let testCase = arr[i].before.slice() //dont want to tamper with the original array.
            codes[key](arr[i].instruction.A, arr[i].instruction.B, arr[i].instruction.C, testCase)
            if (isEqual(testCase, arr[i].after)) {
                possible++
            }
        }
        if (possible >= 3) {
            result++
        }
    }
    return result
}

console.log(`A: ${countSamples(data, opcodes)}`)
