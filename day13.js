let data = document.getElementById('data').innerHTML.split('\n').map((line) => {
    line = line.replace(/&gt;/g, '>')
    line = line.replace(/&lt;/g, '<')
    return line.split('')
})

function findCarts(input) {
    let carts = []
    for (let x = 0; x < input.length; x++) {
        for (let y = 0; y < input[x].length; y++) {
            if (input[x][y] == '<' || input[x][y] == 'v' || input[x][y] == '^' || input[x][y] == '>') {
                carts.push({
                    'id': x + '' + y,
                    'symbol': input[x][y],
                    'position': {'x': x, 'y': y},
                    'passes': 0
                })
                if (input[x][y] == '^' || input[x][y] == 'v') {
                    input[x][y] = '|'
                }
                else if (input[x][y] == '>' || input[x][y] == '<') {
                    input[x][y] = '-'
                }
            }
        }
    }
    return carts
}

function detectedCrash(arr) {
    let uniques = new Set()
    for (let i = 0; i < arr.length; i++) {
        let id = arr[i].position.y + ',' + arr[i].position.x
        if (uniques.has(id)) {
            return true
        }
        else {
            uniques.add(id)
        }
    }
    return false
}

function removeCartsByPosition(x, y, carts) {
    //looping backwards so we can remove items within loop.
    for (var i = carts.length - 1; i >= 0; i--) {
        if (carts[i].position.x == x && carts[i].position.y == y) {
            carts.splice(i, 1)
        }
    }
    return carts
}

function getIntersectionDirection(cart) {
    if (cart.passes == 0) { //left
        if      (cart.symbol == '<') cart.symbol = 'v'
        else if (cart.symbol == '>') cart.symbol = '^'
        else if (cart.symbol == 'v') cart.symbol = '>'
        else if (cart.symbol == '^') cart.symbol = '<'
        cart.passes = 1
    }
    else if (cart.passes == 1) {	//straight
        cart.passes = 2
    }
    else if (cart.passes == 2) { //right
        if      (cart.symbol == '<') cart.symbol = '^'
        else if (cart.symbol == '>') cart.symbol = 'v'
        else if (cart.symbol == 'v') cart.symbol = '<'
        else if (cart.symbol == '^') cart.symbol = '>'
        cart.passes = 0
    }
    return cart
}

function doTick(carts, road) {
    carts.sort((a, b) => a.position.x - b.position.x)	//top cart always starts.
    for (let i = 0; i < carts.length; i++) {
        if (carts.length == 1) {
            console.log(`B: ${carts[i].position.y},${carts[i].position.x}`)
            return true
        }
        //intersection
        if (road[carts[i].position.x][carts[i].position.y] == '+') {
            getIntersectionDirection(carts[i])
        }
        //corner
        if (road[carts[i].position.x][carts[i].position.y] == '\\') {
            if      (carts[i].symbol == '^') carts[i].symbol = '<'
            else if (carts[i].symbol == '<') carts[i].symbol = '^'
            else if (carts[i].symbol == 'v') carts[i].symbol = '>'
            else if (carts[i].symbol == '>') carts[i].symbol = 'v'
        }
        //corner
        if (road[carts[i].position.x][carts[i].position.y] == '/') {
            if      (carts[i].symbol == 'v') carts[i].symbol = '<'
            else if (carts[i].symbol == '>') carts[i].symbol = '^'
            else if (carts[i].symbol == '^') carts[i].symbol = '>'
            else if (carts[i].symbol == '<') carts[i].symbol = 'v'
        }
        //move one step
        if      (carts[i].symbol == '>') carts[i].position.y += 1
        else if (carts[i].symbol == '<') carts[i].position.y -= 1
        else if (carts[i].symbol == 'v') carts[i].position.x += 1
        else if (carts[i].symbol == '^') carts[i].position.x -= 1

        if (detectedCrash(carts)) {
            if (carts.length == 17) {
                console.log(`A: ${carts[i].position.y},${carts[i].position.x}`)
            }
            removeCartsByPosition(carts[i].position.x, carts[i].position.y, carts)
        }
    }
    return false
}

let carts = findCarts(data)
while (true) {
    if (doTick(carts, data))
        break
}
