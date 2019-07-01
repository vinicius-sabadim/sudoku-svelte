<script>
  import Info from "./Info.svelte";
  import Cell from "./Cell.svelte";
  import * as utils from "./utils";

  let selectedDifficult = "hard";
  let gridWithDifficult;
  let gridWithBlockInfo;
  let activePosition = 0;
  let highlightValue = null;

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
        error: value === 0 ? false : !isLegal
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

  const handleChangeNavigation = ({ detail: value }) => {
    activePosition = value;
  };

  const handleHighlight = ({ detail: value }) => {
    if (highlightValue === value) {
      highlightValue = null;
    } else {
      highlightValue = value;
    }
  };

  $: groupedGrid = utils.groupByBlock(gridWithBlockInfo);

  $: errors = utils.getErrors(gridWithBlockInfo);
  $: missingValues = utils.getMissingValues(gridWithBlockInfo, errors);
  $: isVictory = missingValues === 0;

  startGame(selectedDifficult);

  window.addEventListener("keydown", e => {
    e.preventDefault();
    const { key, ctrlKey } = e;

    const [isValid, action] = utils.validateKeyInteraction(key, activePosition);
    if (!isValid) return;

    if (action !== "digit") {
      activePosition = utils.getNewActivePosition(activePosition, action);
    } else {
      const cell = gridWithBlockInfo[activePosition];
      if (cell.readonly) return;

      const event = {
        detail: {
          value: parseInt(key, 10),
          position: activePosition
        }
      };

      ctrlKey ? handlePencil(event) : handlePen(event);
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
              on:change-navigation={handleChangeNavigation}
              on:highlight={handleHighlight}
              on:pen={handlePen}
              on:pencil={handlePencil}
              {cell}
              {activePosition}
              {highlightValue} />
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>
