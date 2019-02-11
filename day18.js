let data = document.getElementById('data').innerHTML.split('\n').map(line => line.split(''))

Array.prototype.clone = function() {
    return JSON.parse(JSON.stringify(this))
}

function getAdjacentPoints(arr, x, y) {
    let result = ''
    if (arr[x - 1] != null) {
        result += arr[x - 1][y - 1] + arr[x - 1][y] + arr[x - 1][y + 1] //above
    }
    if (arr[x + 1] != null) {
        result += arr[x + 1][y - 1] + arr[x + 1][y] + arr[x + 1][y + 1] //below
    }
    result += arr[x][y - 1] + arr[x][y + 1] //same row
    result = result.replace(/undefined/g, '')
    return result
}

function setPoint(point, adjacing) {
    if (point == '.') {
        if (adjacing.replace(/[^|]/g, '').length >= 3) {
            return '|'
        }
        return '.'
    }
    if (point == '|') {
        if (adjacing.replace(/[^#]/g, '').length >= 3) {
            return '#'
        }
        return '|'
    }
    if (point == '#') {
        if (adjacing.replace(/[^#]/g, '').length >= 1 && adjacing.replace(/[^|]/g, '').length >= 1) {
            return '#'
        }
        return '.'
    }
}

function setState(arr, minutes) {
    for (let i = 0; i < minutes; i++) {
        let prev = arr.clone()
        for (let x = 0; x < arr.length; x++) {
            for (let y = 0; y < arr[x].length; y++) {
                let point = prev[x][y]
                arr[x][y] = setPoint(point, getAdjacentPoints(prev, x, y))
            }
        }
    }
    return getResult(arr)
}

function getResult(arr) {
    let str = arr.join('')
    return str.replace(/[^|]/g, '').length * str.replace(/[^#]/g, '').length
}

console.log(`A: ${setState(data.clone(), 10)}`)
