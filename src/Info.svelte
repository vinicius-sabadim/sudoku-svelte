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
    margin-right: 100px;
  }

  h1 {
    font-size: 1.6rem;
    margin: 1rem 0;
  }

  ul {
    width: 200px;
  }

  li {
    border-bottom: 1px solid #555;
    cursor: pointer;
    list-style: none;
    padding: 10px;
    transition: all 0.3s;
    user-select: none;
  }

  li:hover {
    padding-left: 20px;
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
  <ul>
    {#each levels as level}
      <li
        class={level === selectedDifficult ? 'active' : ''}
        on:click={() => handleChange(level)}>
         {levelText[level]}
      </li>
    {/each}
  </ul>

  {#if isVictory}
    <p class="victory">Victory :)</p>
  {/if}
</div>
