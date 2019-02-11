function addAfter(value, marble) {
    let toAdd = { value, previous: marble, next: marble.next }
    marble.next.previous = toAdd
    marble.next = toAdd
    return toAdd
}

function play(game) {
    let results = {}
    let current = { value: 0 }
    let currentPlayer = 1
    current.next = current
    current.previous = current

    for (let i = 0; i <= game.players; i++) {
        results[i] = 0
    }
    for (let marble = 1; marble < game.turns; marble++) {
        if (marble % 23 == 0) {
            results[currentPlayer] += marble
            current = current.previous.previous.previous.previous.previous.previous //hmpf
            results[currentPlayer] += current.previous.value
            current.previous.previous.next = current
            current.previous = current.previous.previous
        } else {
            current = addAfter(marble, current.next)
        }
        currentPlayer = (currentPlayer == game.players) ? 1 : currentPlayer += 1
    }
    return Object.values(results).reduce((a, b) => (a > b) ? a : b)
}

let game = { players: 426, turns: 72058 }
console.log(`A: ${play(game)}`)
game.turns *= 100
console.log(`B: ${play(game)}`)
