<template>
  <div class="game_modal">
    <div class="card card-body shadow border-0">
      <h1>Modal Page</h1>
      <button class="btn btn-success px-4 py-3" @click="retry">Retry</button>
      <button class="btn btn-danger mt-3" @click="close">Close and Score</button>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        retry: { type: Function },
        close: { type: Function },
    },
};
</script>

<style scoped>
.game_modal {
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
}
.game_modal .card {
  top: 40%;
  left: 30%;
  width: 450px;
}
</style>
