const blocks2 = [Array(2).fill([1, 1, 2, 2]), Array(2).fill([3, 3, 4, 4])].flat(
  2
)

const blocks3 = [
  Array(3).fill([1, 1, 1, 2, 2, 2, 3, 3, 3]),
  Array(3).fill([4, 4, 4, 5, 5, 5, 6, 6, 6]),
  Array(3).fill([7, 7, 7, 8, 8, 8, 9, 9, 9])
].flat(2)

export const generateGrid = (blockSize = 3) => {
  const elements = blockSize === 3 ? 81 : 16
  const flattenGrid = Array(elements).fill(0)
  return flattenGrid
}

const shuffle = a => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export const fillGrid = (grid, blockSize = 3) => {
  const gridSize = blockSize === 3 ? 9 : 4

  const stack = []
  let currentIndex = 0
  let currentValue = grid[currentIndex]

  const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])
  let numberIndex = 0

  while (hasZeros(grid)) {
    if (currentValue === 0) {
      if (
        isLegal(grid, currentIndex, numbers[numberIndex], blockSize) &&
        numberIndex < gridSize
      ) {
        grid[currentIndex] = numbers[numberIndex]
        stack.push(currentIndex)
        numberIndex = -1
        currentIndex = currentIndex + 1
        currentValue = grid[currentIndex]
      } else if (numberIndex > gridSize - 1) {
        grid[currentIndex] = 0
        currentIndex = stack.pop()
        numberIndex = numbers.indexOf(grid[currentIndex])
        grid[currentIndex] = 0
      }
    } else {
      currentIndex = currentIndex + 1
      currentValue = grid[currentIndex]
      numberIndex = -1
    }
    numberIndex = numberIndex + 1
  }
  return grid
}

export const includeBlockInfo = (grid, blockSize = 3) => {
  const blocks = blockSize === 3 ? blocks3 : blocks2

  return grid.map((cell, index) => ({
    value: cell,
    block: blocks[index]
  }))
}

export const groupByBlock = grid => {
  const newGrid = []

  grid.forEach((cell, index) => {
    // Because the blocks are starting with 1
    const block = cell.block - 1

    if (newGrid[block]) {
      newGrid[block].push(cell)
    } else {
      newGrid[block] = [cell]
    }
  })

  return newGrid
}

export const isLegal = (grid, position, number, blockSize = 3) => {
  const usedNumbers = new Set()

  const gridSize = blockSize === 3 ? 9 : 4
  const blocks = blockSize === 3 ? blocks3 : blocks2

  // Row
  const row = Math.floor(position / gridSize)
  grid.forEach((cell, index) => {
    if (Math.floor(index / gridSize) === row) {
      usedNumbers.add(cell)
    }
  })

  // Column
  const column = position % gridSize
  grid.forEach((cell, index) => {
    if (Math.floor(index % gridSize) === column) {
      usedNumbers.add(cell)
    }
  })

  // Block
  const block = blocks[position]
  grid.forEach((cell, index) => {
    if (blocks[index] === block) {
      usedNumbers.add(cell)
    }
  })

  return !usedNumbers.has(number)
}

export const hasZeros = grid => {
  return grid.filter(item => item === 0).length !== 0
}

export const getAvailableNumber = (restrictions, blockSize = 3) => {
  const gridSize = blockSize === 3 ? 9 : 4
  let value = null

  while (!value) {
    const number = Math.floor(Math.random() * gridSize) + 1
    if (!restrictions.has(number)) {
      value = number
    }
  }
  return value
}
