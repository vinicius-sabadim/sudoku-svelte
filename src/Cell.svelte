<script>
  import { createEventDispatcher } from "svelte";

  export let cell;
  const dispatch = createEventDispatcher();
  const handleChange = e => {
    e.preventDefault();
    const value = parseInt(e.key);

    // 0 will be used to remove a value from cell
    if (Number.isInteger(value)) {
      dispatch("change", {
        value: parseInt(value, 10),
        position: cell.position
      });
    }
  };
</script>

<style>
  input {
    border: none;
    color: transparent;
    height: 100%;
    margin: 0;
    text-align: center;
    text-shadow: 0 0 0 black;
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
</style>

<input
  bind:value={cell.value}
  class={cell.error ? 'hasError' : ''}
  disabled={cell.readonly}
  pattern="a"
  type="text"
  on:keydown={handleChange} />
