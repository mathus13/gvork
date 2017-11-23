<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <span>{{ player.Persona }}</span>
    </div>
    <div class="panel-body">
      {{ player }}
    </div>
  </div>
</template>

<script>
import Players from '@/services/api/player'
export default {
  props: ['player'],
  data () {
    return {
      playerDetails: {}
    }
  },
  mounted () {
    Players.getPlayer(this.player).then((resp) => {
      this.playerDetails = resp.data.player
    })
  }
}
</script>

<style>

</style>
