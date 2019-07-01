<script>
  import Info from "./Info.svelte";
  import Cell from "./Cell.svelte";
  import * as utils from "./utils";

  let selectedDifficult = "hard";
  let gridWithDifficult;
  let gridWithBlockInfo;
  let activeCellUsingKeyboard = 0;

  const startGame = difficult => {
    const grid = utils.generateGrid(3);
    const filledGrid = utils.fillGrid(grid, 3);
    gridWithDifficult = utils.applyGameDifficult(selectedDifficult, filledGrid);
    gridWithBlockInfo = utils.includeBlockInfo(gridWithDifficult, 3);
  };

  const handlePen = ({ detail: { value, position } }) => {
    const isLegal = utils.isLegal(gridWithDifficult, position, value);
    gridWithBlockInfo = gridWithBlockInfo.map(cell => {
      if (cell.position !== position) {
        return cell;
      }

      return {
        ...cell,
        value: value !== 0 ? value : null,
        error: !isLegal
      };
    });
    gridWithDifficult[position] = value;
  };

  const handlePencil = ({ detail: { value, position } }) => {
    if (value === 0) return;

    gridWithBlockInfo = gridWithBlockInfo.map(cell => {
      if (cell.position !== position) {
        return cell;
      }

      const isAlreadyThere = cell.pencil.has(value);
      if (isAlreadyThere) {
        cell.pencil.delete(value);
      } else {
        cell.pencil.add(value);
      }

      return cell;
    });
  };

  const handleChangeDifficult = ({ detail }) => {
    selectedDifficult = detail;
    startGame(selectedDifficult);
  };

  $: groupedGrid = utils.groupByBlock(gridWithBlockInfo);

  $: errors = utils.getErrors(gridWithBlockInfo);
  $: missingValues = utils.getMissingValues(gridWithBlockInfo, errors);
  $: isVictory = missingValues === 0;

  startGame(selectedDifficult);

  window.addEventListener("keydown", e => {
    e.preventDefault();

    const { key, code, ctrlKey } = e;
    if (code === "ArrowDown" && activeCellUsingKeyboard < 72) {
      activeCellUsingKeyboard += 9;
    } else if (code === "ArrowUp" && activeCellUsingKeyboard > 8) {
      activeCellUsingKeyboard -= 9;
    } else if (code === "ArrowLeft" && activeCellUsingKeyboard % 9 > 0) {
      activeCellUsingKeyboard -= 1;
    } else if (code === "ArrowRight" && activeCellUsingKeyboard % 9 < 8) {
      activeCellUsingKeyboard += 1;
    } else if (code.substring(0, 5) === "Digit") {
      const event = {
        detail: { value: parseInt(key, 10), position: activeCellUsingKeyboard }
      };
      if (ctrlKey) handlePencil(event);
      else handlePen(event);
    }
  });
</script>

<style>
  .container {
    display: flex;
    justify-content: center;
    padding-top: 50px;
  }
  .grid {
    background-color: #aaa;
    border: 1px solid #ccc;
    display: grid;
    grid-template-columns: auto auto auto;
    grid-gap: 6px;
  }
  .block {
    background-color: #ccc;
    display: grid;
    grid-gap: 3px;
    grid-template-columns: auto auto auto;
  }
  .cell {
    align-items: center;
    background-color: lightyellow;
    display: flex;
    font-size: 2rem;
    height: calc(80vh / 9);
    justify-content: center;
    position: relative;
    user-select: none;
    width: calc(80vh / 9);
  }
</style>

<div class="container">
  <Info
    on:change-difficult={handleChangeDifficult}
    {isVictory}
    {selectedDifficult} />
  <div class="grid">
    {#each groupedGrid as block}
      <div class="block">
        {#each block as cell}
          <div class="cell">
            <Cell
              on:pen={handlePen}
              on:pencil={handlePencil}
              {cell}
              {activeCellUsingKeyboard} />
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>
