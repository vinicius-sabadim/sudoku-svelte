<script>
  import { createEventDispatcher } from "svelte";

  export let cell;
  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const dispatch = createEventDispatcher();
  const handleChange = e => {
    const value = parseInt(e.key);
    const isCtrlPressed = e.ctrlKey;

    // 0 will be used to remove a value from cell
    if (Number.isInteger(value)) {
      if (!isCtrlPressed) {
        dispatch("pen", {
          value: parseInt(value, 10),
          position: cell.position
        });
      } else {
        dispatch("pencil", {
          value: parseInt(value, 10),
          position: cell.position
        });
      }
    }
  };

  const putFocus = e => {
    const element = e.currentTarget.querySelector("input");
    element.focus();
  };
</script>

<style>
  input {
    border: none;
    color: transparent;
    height: 100%;
    margin: 0;
    text-align: center;
    text-shadow: 0 0 0 darkslategray;
    user-select: none;
    width: 100%;
  }

  input:focus {
    background-color: whitesmoke;
    border: none;
    outline: none;
  }

  input:disabled {
    background-color: inherit;
  }

  .hasError,
  .hasError:focus {
    background-color: lavenderblush;
    text-shadow: 0 0 0 salmon;
  }

  .container {
    height: 100%;
  }

  .pencil-container {
    display: grid;
    font-size: 18px;
    grid:
      "option1 option2 option3"
      "option4 option5 option6"
      "option7 option8 option9";
    height: 100%;
    left: 0;
    position: absolute;
    text-align: center;
    top: 0;
    width: 100%;
  }

  .option {
    align-items: center;
    color: transparent;
    display: flex;
    justify-content: center;
  }

  .visibleOption {
    color: darkslategray;
  }

  .option1 {
    grid-area: option1;
  }
  .option2 {
    grid-area: option2;
  }
  .option3 {
    grid-area: option3;
  }
  .option4 {
    grid-area: option4;
  }
  .option5 {
    grid-area: option5;
  }
  .option6 {
    grid-area: option6;
  }
  .option7 {
    grid-area: option7;
  }
  .option8 {
    grid-area: option8;
  }
  .option9 {
    grid-area: option9;
  }
</style>

<div class="container" on:click={putFocus}>
  <input
    bind:value={cell.value}
    class={cell.error ? 'hasError' : ''}
    disabled={cell.readonly}
    type="text"
    on:keydown|preventDefault={handleChange} />
  {#if !cell.value}
    <ul class="pencil-container">
      {#each options as option}
        <li
          class={`option option${option} ${cell.pencil.has(option) ? 'visibleOption' : ''} `}>
           {option}
        </li>
      {/each}
    </ul>
  {/if}
</div>
