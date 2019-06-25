<script>
  import Info from "./Info.svelte";
  import Cell from "./Cell.svelte";
  import * as utils from "./utils";

  let selectedDifficult = "hard";
  let gridWithDifficult;
  let gridWithBlockInfo;

  const startGame = difficult => {
    const grid = utils.generateGrid(3);
    const filledGrid = utils.fillGrid(grid, 3);
    gridWithDifficult = utils.applyGameDifficult(selectedDifficult, filledGrid);
    gridWithBlockInfo = utils.includeBlockInfo(gridWithDifficult, 3);
  };

  const handleChange = ({ detail: { value, position } }) => {
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
</script>

<style>
  :global(body) {
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
  }
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
    background-color: white;
    display: flex;
    font-size: 2rem;
    height: calc(80vh / 9);
    justify-content: center;
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
            <Cell on:change={handleChange} {cell} />
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>
