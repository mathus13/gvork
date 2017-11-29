<template>
  <div>
    <h1 class="text-left">{{ park.ParkName }}</h1>
    <div class="col-md-2 list-group">
      <a class="list-group-item" href="#">Create Player</a>
      <a class="list-group-item" href="#" @click="loadAttendance">Attendance</a>
      <div class="list-group-item">
        Active Players
      </div>
      <a class="list-group-item" href="#" @click="setPlayer(player)" v-for="player in players">{{ player.Persona }}</a>
    </div>
    <div class="col-md-10">
      <Attendance v-if="showAttendance" :park="park"></Attendance>
      <Player v-if="player" :player="player"></Player>
    </div>
  </div>
</template>
<script>
import Parks from '@/services/api/park'
import Player from './Player'
import Attendance from './Attendance'
export default {
  data () {
    return {
      players: [],
      player: null,
      park: {},
      showAttendance: false
    }
  },
  components: {
    Player: Player,
    Attendance: Attendance
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
      this.showAttendance = false
    },
    loadAttendance () {
      this.showAttendance = true
      this.player = false
    }
  }
}
</script>
