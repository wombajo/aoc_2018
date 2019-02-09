let data = document.getElementById('data').innerHTML.split('\n').map(line => parseInt(line))
let a = data.reduce((acc, curr) => acc + curr)

function findDuplicateFrequency(arr) {
  let frequency = 0
  let frequencies = new Set()
  while (true) {
    for (let i = 0; i < arr.length; i++) {
      let current = frequency += arr[i]
      if (frequencies.has(current)) {
        return current
      }
      else {
        frequencies.add(current)
      }
    }
  }
}

console.log(`A: ${a}`)
console.log(`B: ${findDuplicateFrequency(data)}`)
