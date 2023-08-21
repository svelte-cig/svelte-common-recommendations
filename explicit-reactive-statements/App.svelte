<script>
  import { ProgressBar } from '@skeletonlabs/skeleton'

  let counter = 0
  let achievements = 0
  let achievementCompleted = false
  let buttonEnabled = true

  function increase() {
    counter++
  }

  function next() {
    counter = 0
    buttonEnabled = true
    achievementCompleted = false
  }

  $: onChangeCounter(counter)
  function onChangeCounter(counter) {
    achievementCompleted = counter > 4

    if (achievementCompleted) {
      achievements++
      buttonEnabled = false
    }
  }
</script>

<div class="card p-4">
  <ProgressBar label="Progress Bar" value={counter} max={4} />
  <br />
  <p>Clicke the button to complete achievements.</p>
  <br />
  <button disabled={!buttonEnabled} type="button" class="btn variant-filled-primary" on:click={increase}>
    <span>Click me ({counter})</span>
  </button>
</div>

{#if achievementCompleted}
  <div class="p-4">
    <span>Congratulations, you've completed {achievements} achievements.</span>
    <button type="button" class="btn variant-filled-primary" on:click={next}>
      <span>Next achievement.</span>
    </button>
  </div>
{/if}
