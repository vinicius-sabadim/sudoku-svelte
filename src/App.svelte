<script>
  import Cell from "./Cell.svelte";
  import * as utils from "./utils";

  const grid = utils.generateGrid(3);
  const filledGrid = utils.fillGrid(grid, 3);
  const gridWithDifficult = utils.applyGameDifficult("insane", filledGrid);
  let gridWithBlockInfo = utils.includeBlockInfo(gridWithDifficult, 3);
  $: groupedGrid = utils.groupByBlock(gridWithBlockInfo);

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
</script>

<style>
  .grid {
    background-color: #aaa;
    border: 1px solid #ccc;
    display: grid;
    grid-template-columns: auto auto auto;
    grid-gap: 6px;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
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
