let data = document.getElementById('data').innerHTML.split(' ').map((number) => parseInt(number))

function buildTree(input) {
	let tree = {}
  tree.children = []
	let childCount = input.splice(0, 1)
  let metadataCount = input.splice(0, 1)

  for (let i = 0; i < childCount; i++) {
  	tree.children.push(buildTree(input))
  }

  if (metadataCount > 0) {
  	tree.metadata = input.splice(0, metadataCount)
  }
  return tree;
}

let sum = 0
function calculateSum(tree) {
	sum += tree.metadata.reduce((a, b) => a + b)
  if (tree.children.length > 0) {
  	for (let i = 0; i < tree.children.length; i++) {
    	calculateSum(tree.children[i])
    }
  }
  return sum;
}

let tree = buildTree(data)
console.log(`A: ${calculateSum(tree, 0)}`)
console.log(`B: ${rootValue(tree)} - wrong.`)

function rootValue(tree) {
	let pointers = tree.metadata
  let result = 0
  for (let i = 0; i < pointers.length; i++) {
  	if (tree.children[pointers[i] - 1])
  		result += tree.children[pointers[i] - 1].metadata.reduce((a,b) => a + b)
  }
  return result;
}
