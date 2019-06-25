<script>
  import { createEventDispatcher } from "svelte";

  export let isVictory;
  export let selectedDifficult;

  const dispatch = createEventDispatcher();
  const handleChange = difficult => {
    dispatch("change-difficult", difficult);
  };

  const levels = ["easy", "medium", "hard", "veryHard", "insane"];
  const levelText = {
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    veryHard: "Very hard",
    insane: "Insane"
  };
</script>

<style>
  .container {
    margin-right: 50px;
  }

  h1 {
    font-size: 1.6rem;
    margin: 1rem 0;
  }

  ul.level-menu {
    width: 200px;
  }

  .level-menu li {
    border-bottom: 1px solid #555;
    cursor: pointer;
    padding: 10px;
    transition: all 0.3s;
    user-select: none;
  }

  .level-menu li:hover {
    padding-left: 20px;
  }

  .hint-container {
    margin-top: 40px;
    width: 250px;
  }

  .hint-container h2 {
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }

  .hint-container li {
    padding: 5px 0;
  }

  .active {
    background-color: burlywood;
    color: white;
    font-weight: bold;
  }

  .victory {
    animation: pulse 0.5s alternate infinite;
    color: brown;
    font-size: 2rem;
    font-weight: bold;
    margin: 2rem 0;
    padding: 0 10px;
  }

  @keyframes pulse {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(0.9);
    }
  }
</style>

<div class="container">
  <h1>Change level</h1>
  <ul class="level-menu">
    {#each levels as level}
      <li
        class={level === selectedDifficult ? 'active' : ''}
        on:click={() => handleChange(level)}>
         {levelText[level]}
      </li>
    {/each}
  </ul>

  <div class="hint-container">
    <h2>Hints</h2>
    <ul>
      <li>Use the number 0 to erase a cell.</li>
      <li>Use ctrl + number to fill a cell using a pencil.</li>
    </ul>
  </div>

  {#if isVictory}
    <p class="victory">Victory :)</p>
  {/if}
</div>
