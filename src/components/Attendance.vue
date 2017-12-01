<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      Attendance
    </div>
    <div class="panel-body">
      <div class="col-md-6 text-left">
        <div class="form-group">
          <label for="Date">Date</label>
          <input type="date" v-model="date" class="form-control" />
        </div>
        <div class="col-md-6 form-group">
          <label for="Kingdom">Kingdom</label>
          <select class="form-control" v-model="kingdomId">
            <option v-for="kingdom in kingdoms" :value="kingdom.KingdomId">{{ kingdom.KingdomName }}</option>
          </select>
        </div>
        <div class="col-md-6 form-group">
          <label for="Park">Park</label>
          <select class="form-control" v-model="parkId">
            <option v-for="park in parks" :value="park.ParkId">{{ park.Name }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="Player">Player</label>
          <select class="form-control" v-model="playerId">
            <option v-for="player in players" :value="player.MundaneId">{{ player.Persona }}</option>
          </select>
        </div>
        <div class="form-group col-md-6">
          <label for="Class">Class</label>
          <select class="form-control" v-model="classId">
            <option v-for="skill in classes" :value="skill.ClassId">{{ skill.Name }}</option>
          </select>
        </div>
        <div class="form-group col-md-6">
          <label for="Credits">Credits</label>
          <input type="number" v-model="credits" class="form-control" />
        </div>
        <div class="form-group">
          <button type="button" class="btn btn-primary" @click="send">Enter Attendance</button>
        </div>
      </div>
      <div class="col-md-6 list-group">
        <div>
          {{ date }}
        </div>
        <div v-for="item in attendance" class="list-group-item">
          <p>
            {{ item.Persona }}
          </p>
          <span class="text-muted">
            {{ item.ClassName }} {{ item.FromKingdomName }}::{{ item.FromParkName }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Parks from '@/services/api/park'
import Collections from 'lodash/collection'
import Moment from 'moment'
import PubSub from 'pubsub-js'
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
      let date = Moment(this.date)
      Parks.addAttendance(
        this.token,
        date.format('Y-MM-DD'),
        this.classId,
        this.parkId,
        this.kingdomId,
        this.credits,
        this.playerId
      ).then(resp => {
        if (resp.data.Error === 'Success') {
          PubSub.publish('alerts.add', {
            key: 'addattendance',
            message: 'Attendance Added',
            timestamp: Date().toString(),
            type: 'success'
          })
        } else {
          PubSub.publish('alerts.add', {
            key: 'addattendance',
            message: 'Error adding attendance: ' + resp.data.Error,
            timestamp: Date().toString(),
            type: 'warning'
          })
        }
      })
    },
    getParks () {
      Parks.getParks(this.kingdomId).then((resp) => {
        this.parks = resp.data.Parks
      })
    },
    getPlayers () {
      if (!this.activePark) {
        return
      }
      Parks.getPlayers(this.activePark, this.token).then((resp) => {
        this.players = resp.data.Roster
      })
    },
    getAttendance () {
      Parks.getAttendance(this.activePark, this.date).then((resp) => {
        if (resp.data.Attendance) {
          this.attendance = resp.data.Attendance
        } else {
          this.attendance = []
        }
      })
    },
    removeAttendance (id) {
      Parks.deleteAttendance(this.token, id).then(resp => {
        this.getAttendance()
      })
    }
  },
  watch: {
    kingdomId () {
      this.parks = []
      this.players = []
      this.getParks()
    },
    parkId () {
      this.players = []
      this.getPlayers()
    },
    date () {
      this.getAttendance()
    }
  },
  mounted () {
    this.parks.push(this.park)
    this.kingdomId = this.park.KingdomId
    this.parkId = this.park.ParkId
    this.getParks()
    this.getPlayers()
    this.$store.dispatch('getKingdoms')
    Parks.getClasses().then(resp => {
      this.classes = resp.data.Classes
    })
  }
}
</script>

<style>

</style>
