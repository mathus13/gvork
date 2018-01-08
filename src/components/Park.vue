<template>
  <div>
    <h1 class="text-left">{{ park.ParkName }}</h1>
    <div class="col-md-2 list-group">
      <a v-if="canEdit" class="list-group-item" href="#" @click="loadAddUser">Create Player</a>
      <a v-if="canEdit" class="list-group-item" href="#" @click="loadAttendance">Attendance</a>
      <div class="list-group-item">
        Active Players
      </div>
      <a class="list-group-item" href="#" @click="setPlayer(player)" v-for="player in players">{{ player.Persona }}</a>
    </div>
    <div class="col-md-10">
      <div v-if="start">
        <playerSearch :park="park.ParkId"></playerSearch>
        <Mapbox v-if="park.Location" :geoData="park.Location" class="col-md-5"></Mapbox>
        <div class="col-md-7 panel panel-default panel-body text-left">
          <div v-if="park.HasHeraldry" class="col-md-2 pull-left">
            <img :src="heraldryUrl" class="img-responsive img-rounded">
          </div>
          <p>{{ park.Description }}</p>
          <p>{{ park.Directions }}</p>
          <p>
            <a :href="park.Url" target="_blank">Website</a>
          </p>
          <p>
            <a :href="park.MapUrl" target="_blank">Google Map</a>
          </p>
          <table class="table table-striped">
            <tbody>
              <tr v-for="officer in officers">
                <th>{{ officer.OfficerRole }}</th>
                <td>{{ officer.Persona }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Attendance v-if="showAttendance" :park="park"></Attendance>
      <Player v-if="player" :player="player"></Player>
      <UserForm v-if="addUser" :park="park"></UserForm>
    </div>
  </div>
</template>
<script>
import Parks from '@/services/api/park'
import Player from './Player'
import Attendance from './Attendance'
import UserForm from './UserForm'
import PlayerSearch from './SearchPlayers'
import Map from './Map'
import { mapGetters } from 'vuex'
import Collection from 'lodash/collection'
export default {
  data () {
    return {
      players: [],
      player: null,
      park: {},
      showAttendance: false,
      addUser: false,
      start: true,
      officers: []
    }
  },
  components: {
    playerSearch: PlayerSearch,
    Player: Player,
    Attendance: Attendance,
    Mapbox: Map,
    UserForm: UserForm
  },
  computed: {
    canEdit () {
      let search = {'Type': 'Park', 'Id': this.park.ParkId}
      let match = Collection.filter(this.authorizations, search)
      return (match && match.length > 0)
    },
    heraldryUrl () {
      let imageId = this.park.ParkId
      while (imageId.length < 7) {
        imageId = '0' + imageId
      }
      return `https//amtgard.com/ork/assets/heraldry/park/${imageId}.jpg`
    },
    ...mapGetters({
      user: 'getUser',
      authorizations: 'getAuthorizations'
    })
  },
  mounted () {
    Parks.getParkShort(this.$route.params.parkId).then((resp) => {
      resp.data.ParkInfo.Location = JSON.parse(resp.data.ParkInfo.Location)
      this.park = (resp.data.ParkInfo) ? resp.data.ParkInfo : {}
      Parks.getPark(this.park.ParkId).then(resp => {
        if (resp.data.Status.Error === 'Success') {
          resp.data.mapUrl = 'https://www.google.com/maps/embed/v1/place?key=' + this.mapKey + '&q=' + this.park.Address
          resp.data.GoogleGeocode = JSON.parse(resp.data.GoogleGeocode)
          resp.data.Location = JSON.parse(resp.data.Location)
          let park = Object.assign(this.park, resp.data)
          this.park = park
          this.getOfficers()
        }
      })
    })
    Parks.getActivePlayers(this.$route.params.parkId).then((resp) => {
      this.players = resp.data.ActivePlayerSummary
    })
  },
  methods: {
    setPlayer (player) {
      this.player = player
      this.showAttendance = false
      this.addUser = false
      this.start = false
    },
    loadAttendance () {
      this.showAttendance = true
      this.player = false
      this.addUser = false
      this.start = false
    },
    loadAddUser () {
      this.addUser = true
      this.showAttendance = false
      this.player = false
      this.start = false
    },
    getOfficers () {
      Parks.getOfficers(this.park).then(resp => {
        if (!resp.data.Officers) {
          return
        }
        this.officers = resp.data.Officers
      })
    }
  }
}
</script>
