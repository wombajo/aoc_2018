let data = document.getElementById('data').innerHTML.split('\n').map(function(line) {
  return buildObj(line.replace(/[#@:]/g, '').replace(',', ' ').split(' '))
})

function buildObj(arr) {
  return {
    'id': arr[0],
    'x1': parseInt(arr[2]),
    'y1': parseInt(arr[3]),
    'x2': parseInt(arr[2]) + (parseInt(arr[4].split('x')[0]) - 1),
    'y2': parseInt(arr[3]) + (parseInt(arr[4].split('x')[1]) - 1)
  }
}

function buildGrid(size) {
  let grid = []
  for (let i = 0; i < size; i++) {
    let arr = []
    for (let j = 0; j < size; j++) {
      arr.push('.')
    }
    grid.push(arr)
  }
  return grid
}

function drawObjects(grid, objects) {
  let overlaps = 0
  let intact
  let intact_id = ''
  for (let a = 0; a < objects.length; a++) {
    intact = true
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if ( objects[a].x1 <= i && objects[a].x2 >= i &&
          objects[a].y1 <= j && objects[a].y2 >= j) {

          if (grid[i][j] == '.') {
            grid[i][j] = objects[a].id
          }
          else if (grid[i][j] == 'X') {
            intact = false
          }
          else if (grid[i][j] !== objects[a].id){
            grid[i][j] = 'X'
            intact = false
            overlaps++
          }
        }
      }
    }
    if (intact) {
      intact_id = objects[a].id
    }
  }
  return {'grid': grid, 'overlaps': overlaps, 'intact_id': intact_id}
}

let grid = buildGrid(1500)
let first = drawObjects(grid, data)
let second = drawObjects(first.grid, data)
console.log(`A: ${first.overlaps}`)
console.log(`B: ${second.intact_id}`)
