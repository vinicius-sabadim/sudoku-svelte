<script>
  import * as utils from "./utils";

  const grid = utils.generateGrid(3);
  const filledGrid = utils.fillGrid(grid, 3);
  const gridWithBlockInfo = utils.includeBlockInfo(filledGrid, 3);
  const groupedGrid = utils.groupByBlock(gridWithBlockInfo);
</script>

<style>
  .grid {
    background-color: #aaa;
    border: 1px solid #ccc;
    display: grid;
    grid-template-columns: auto auto auto;
    grid-gap: 6px;
    height: 80vh;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 80vh;
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
    justify-content: center;
  }
</style>

<div class="grid">
  {#each groupedGrid as block}
    <div class="block">
      {#each block as cell}
        <div class="cell">{cell.value}</div>
      {/each}
    </div>
  {/each}
</div>
