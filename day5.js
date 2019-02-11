let data = document.getElementById('data').innerHTML

const reducer = (acc, curr) => {
    if (acc == null)
        return null
    if (acc[acc.length - 1] == curr)
        return acc + curr
    if (acc[acc.length - 1] == curr.toUpperCase() || acc[acc.length - 1] == curr.toLowerCase()) {
        return acc.substring(0, acc.length - 1)
    } else {
        return acc + curr
    }
}

function getLowestPolymer(input) {
    let obj = {}
    for(var i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
        let current = String.fromCharCode(i)
        let id = current + current.toUpperCase()
        obj[id] = {
            'polymer': removeChar(input, id).split('').reduce(reducer).length
        }
    }
    return obj[Object.keys(obj).reduce((a, b) => obj[a].polymer < obj[b].polymer ? a : b)].polymer
}

function removeChar(input, char) {
    let regex = new RegExp('[' + char[0] + char[1] + ']', 'g')
    return input.replace(regex, '')
}

console.log(`A: ${data.split('').reduce(reducer).length}`)
console.log(`B: ${getLowestPolymer(data)}`)
