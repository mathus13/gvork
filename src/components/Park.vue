<template>
  <div>
    <h1>{{ park.Name }}</h1>
    <div class="col-md-2 list-group">
      <a class="list-group-item" href="#">Create Player</a>
      <a class="list-group-item" href="#">Attendance</a>
      <a class="list-group-item" href="#" @click="setPlayer(player)" v-for="player in players">{{ player.Persona }}</a>
    </div>
    <div class="col-md-10">
      <Player v-if="player" :player="player"></Player>
    </div>
  </div>
</template>
<script>
import Parks from '@/services/api/park'
import Player from './Player'
export default {
  data () {
    return {
      players: [],
      player: null,
      park: {}
    }
  },
  components: {
    Player: Player
  },
  mounted () {
    Parks.getPark(this.$route.params.parkId).then((resp) => {
      this.park = (resp.data.ParkInfo) ? resp.data.ParkInfo : {}
    })
    Parks.getActivePlayers(this.$route.params.parkId).then((resp) => {
      this.players = resp.data.ActivePlayerSummary
    })
  },
  methods: {
    setPlayer (player) {
      this.player = player
    }
  }
}
</script>
