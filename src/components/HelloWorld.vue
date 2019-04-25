<template lang="pug">
  .hello
    #info
      a(href="javascript:control.setMode( 'translate' );") "W" translate
      |  |
      a(href="javascript:control.setMode( 'rotate' );") "E" rotate
      |  |
      a(href="javascript:control.setMode( 'scale' );") "R" scale
      |  |
      a(href='javascript:control.setSize( control.size + 0.1 );') "+" increase size
      |  |
      a(href='javascript:control.setSize( Math.max( control.size - 0.1, 0.1 ) );') "-" decrease size
      br
      a(href="javascript:control.setSpace( control.space === 'local' ? 'world' : 'local' );") "Q" toggle world/local space
      |  | Hold "Ctrl" down to snap to grid
      br
      a(href='javascript:control.showX = !control.showX') "X" toggle X
      |  |
      a(href='javascript:control.showY = !control.showY') "Y" toggle Y
      |  |
      a(href='javascript:control.showZ = !control.showZ') "Z" toggle Z
      |  |
      a(href='javascript:control.enabled = !control.enabled') "Spacebar" toggle enabled
      br
    div(id="draggable-cubes")
</template>

<script>
// import WorkerWebGl from '../service/WorkerWebGl.js';
import WorkerControl from '../service/WorkerControl.js';

export default {
  created () {
    this.$nextTick(() => {
      setTimeout(() => {
        WorkerControl.setupScene('draggable-cubes') 
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
