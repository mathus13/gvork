<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      Attendance
    </div>
    <div class="panel-body">
      <div class="form-group">
        <label for="Date">Date</label>
        <input type="date" model="date" class="form-control" />
      </div>
      <div class="col-md-6 form-group">
        <label for="Kingdom">Kingdom</label>
        <select class="form-control" model="kingdomId">
          <option v-for="kingdom in kingdoms" :value="kingdom.KingdomId">{{ kingdom.KingdomName }}</option>
        </select>
      </div>
      <div class="col-md-6 form-group">
        <label for="Park">Park</label>
        <select class="form-control" model="parkId">
          <option v-for="park in parks" :value="park.ParkId">{{ park.ParkName }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="Player">Player</label>
        <select class="form-control" model="playerId">
          <option v-for="player in players" :value="player.PlayerId">{{ player.PlayerName }}</option>
        </select>
      </div>
      <div class="form-group col-md-6">
        <label for="Class">Class</label>
        <select class="form-control" model="classId">
          <option v-for="skill in classes" :value="skill.ClassId">{{ skill.ClassName }}</option>
        </select>
      </div>
      <div class="form-group col-md-6">
        <label for="Credits">Credits</label>
        <input type="number" model="credits" class="form-control" />
      </div>
      <div class="form-group">
        <button type="button" class="btn btn-primary" @click="send">Enter Attendance</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Parks from '@/services/api/park'
import Collections from 'lodash/collection'
export default {
  props: ['park'],
  data () {
    return {
      classes: [],
      parks: [],
      players: [],
      attendance: [],
      credits: 1,
      kingdomId: null,
      parkId: null,
      classId: null,
      playerId: null,
      date: null
    }
  },
  computed: {
    ...mapGetters({
      kingdoms: 'getKingdoms',
      token: 'getToken'
    }),
    activePark () {
      return Collections.find(this.parks, {ParkId: this.parkId})
    }
  },
  methods: {
    send () {
      Parks.addAttendance(this.token, this.date, this.classId, this.parkId, this.kingdomId, this.credits)
    },
    getParks () {
      Parks.getParks(this.KingdomId).then((resp) => {
        this.parks = resp.data.Parks
      })
    },
    getPlayers () {
      Parks.getPlayers(this.activePark, this.token).then((resp) => {
        this.players = resp.data.Roster
      })
    },
    getAttendance () {
      Parks.getAttendance(this.activePark, this.date).then((resp) => {
        this.attendance = resp.data.Attendance
      })
    }
  }
}
</script>

<style>

</style>
