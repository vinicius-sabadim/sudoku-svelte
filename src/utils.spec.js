import * as utils from './utils'

describe('Grid', () => {
  test('should have 81 elements', () => {
    const grid = utils.generateGrid()
    expect(grid.length).toBe(81)
  })

  test('all cells must be initialized with zeros', () => {
    const grid = utils.generateGrid()
    const zeros = grid.filter(cell => cell === 0)
    expect(zeros.length).toBe(81)
  })

  test('should create a valid grid for 2x2', () => {
    const grid = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    const filledGrid = utils.fillGrid(grid, 2)
    expect(utils.hasZeros(filledGrid)).toBe(false)
  })

  test('should create a valid grid for 3x3', () => {
    const grid = utils.generateGrid()
    const filledGrid = utils.fillGrid(grid, 3)
    expect(utils.hasZeros(filledGrid)).toBe(false)
  })

  test('should include block info', () => {
    const grid = utils.generateGrid()
    const gridWithBlockInfo = utils.includeBlockInfo(grid, 3)
    expect(gridWithBlockInfo[0].block).toBe(1)
    expect(gridWithBlockInfo[79].block).toBe(9)
  })

  test('should group by block', () => {
    const grid = utils.generateGrid()
    const gridWithBlockInfo = utils.includeBlockInfo(grid, 3)
    const grouped = utils.groupByBlock(gridWithBlockInfo)
    expect(grouped[1].length).toBe(9)
  })
})

describe('applyGameDifficult', () => {
  test('should remove elements for an easy game', () => {
    const grid = utils.generateGrid()
    const newGrid = utils.applyGameDifficult('easy', grid)
    const gridWithDifficult = newGrid.filter(cell => cell !== null)
    expect(gridWithDifficult.length).toBe(62)
  })

  test('should remove elements for a medium game', () => {
    const grid = utils.generateGrid()
    const newGrid = utils.applyGameDifficult('medium', grid)
    const gridWithDifficult = newGrid.filter(cell => cell !== null)
    expect(gridWithDifficult.length).toBe(53)
  })

  test('should remove elements for a hard game', () => {
    const grid = utils.generateGrid()
    const newGrid = utils.applyGameDifficult('hard', grid)
    const gridWithDifficult = newGrid.filter(cell => cell !== null)
    expect(gridWithDifficult.length).toBe(44)
  })

  test('should remove elements for a very hard game', () => {
    const grid = utils.generateGrid()
    const newGrid = utils.applyGameDifficult('veryHard', grid)
    const gridWithDifficult = newGrid.filter(cell => cell !== null)
    expect(gridWithDifficult.length).toBe(35)
  })
})

describe('isLegal', () => {
  test('should allow a value when it is not present at the row', () => {
    const grid = [0, 0, 0, 0, 2, 1, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0]
    expect(utils.isLegal(grid, 6, 3, 2)).toBe(true)
  })

  test('should allow a value when it is not present at the column', () => {
    const grid = [0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 4, 0]
    expect(utils.isLegal(grid, 10, 3, 2)).toBe(true)
  })

  test('should allow a value when it is not present at the block', () => {
    const grid = [0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 4, 0, 0, 0]
    expect(utils.isLegal(grid, 13, 3, 2)).toBe(true)
  })

  test('should NOT allow a value when it is present at the row', () => {
    const grid = [0, 0, 0, 0, 2, 1, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0]
    expect(utils.isLegal(grid, 6, 4, 2)).toBe(false)
  })

  test('should NOT allow a value when it is present at the column', () => {
    const grid = [0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 4, 0]
    expect(utils.isLegal(grid, 10, 4, 2)).toBe(false)
  })

  test('should NOT allow a value when it is present at the block', () => {
    const grid = [0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 4, 0, 0, 0]
    expect(utils.isLegal(grid, 13, 4, 2)).toBe(false)
  })
})

describe('hasZeros', () => {
  test('should return true when there is still zeros', () => {
    const grid = [0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 4, 0, 0, 0]
    expect(utils.hasZeros(grid)).toBe(true)
  })

  test('should return false when there is no zeros', () => {
    const grid = [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]
    expect(utils.hasZeros(grid)).toBe(false)
  })
})

describe('getAvailableNumber', () => {
  test('should get the number 3', () => {
    const restrictions = new Set([1, 2, 4])
    expect(utils.getAvailableNumber(restrictions, 2)).toBe(3)
  })

  test('should get a number different than 3', () => {
    const restrictions = new Set([3])
    const number = utils.getAvailableNumber(restrictions, 2)
    expect(restrictions.has(number)).toBe(false)
  })
})
