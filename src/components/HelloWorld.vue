<template lang="pug">
  .hello
      div(id="draggable-cubes")
</template>

<script>
import WorkerWebGl from '../service/WorkerWebGl.js';

export default {
  created () {
    this.$nextTick(() => {
      setTimeout(() => {
        WorkerWebGl.setupScene('draggable-cubes') 
      }, 1000);
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#hello 
  width 100vw
  height 100vh
  overflow hidden
  
</style>
