let data = document.getElementById('data').innerHTML.split('\n')

function countChars(str) {
    let result = {}
    str.split('').forEach(char => result[char] ? result[char]++ : result[char] = 1)
    for (let property in result) {
        if (result[property] !== 2 && result[property] !== 3) {
            delete result[property]
        }
    }
    return result
}

function partA(arr) {
    arr = arr.map(line => countChars(line))
    let result = {'two': 0, 'three': 0}
    let twoUsed = false, threeUsed = false
    for (let i = 0; i < arr.length; i++) {
        for (let prop in arr[i]) {
            if (arr[i][prop] == 2 && !twoUsed) {
                result.two++
                twoUsed = true
            }
            if (arr[i][prop] == 3 && !threeUsed) {
                result.three++
                threeUsed = true
            }
        }
        twoUsed = false
        threeUsed = false
    }
    return result.two * result.three
}

function partB(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            let chars = arr[i].split('')
            let chars_next = arr[j].split('')
            let diff = chars.reduce((acc, curr, idx) => acc + (curr === chars_next[idx] ? 0 : 1), 0)
            if (diff == 1) {
                return diffStr(chars, chars_next)
            }
        }
    }
}

function diffStr(str1, str2) {
    let result = ''
    for (let i = 0; i < str1.length; i++) {
        if (str1[i] == str2[i])
        result += str1[i]
    }
    return result
}

console.log(`A: ${partA(data)}`)
console.log(`B: ${partB(data)}`)
