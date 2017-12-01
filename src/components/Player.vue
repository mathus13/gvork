<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <span class="h2">{{ playerDetails.Persona }}</span>
    </div>
    <div class="panel-body">
      <div v-if="playerDetails.HasImage || playerDetails.HasHeraldry" class="col-md-2">
        <div class="avatar">
          <img :src="'https:' + playerDetails.Image" alt="Player has no image" title="Player image" class="img-responsive img-rounded">
        </div>
        <div class="avatar">
          <img :src="'https:' + playerDetails.Heraldry" alt="Player has no heraldry" title="Player heraldry" class="img-responsive img-rounded">
        </div>
      </div>
      <div class="col-md-10">
        <Classes class="col-md-4" :player="playerDetails"></Classes>
        <div class="col-sm-8">
          <span class="h3">Details</span>
          <table class="table table-striped">
            <tbody>
              <tr>
                <th>Player</th>
                <td>{{ (playerDetails.GivenName) ? playerDetails.GivenName + ' ' + playerDetails.Surname : ''}}</td>
                <th>Persona</th>
                <td>{{ playerDetails.Persona }}</td>
              </tr>
              <tr>
                <th>Username</th>
                <td>{{ playerDetails.UserName }}</td>
                <th>Email</th>
                <td><a :href="'mailto:' + playerDetails.Email">{{ playerDetails.Email }}</a></td>
              </tr>
              <tr>
                <th>Kingdom</th>
                <td><router-link :to="{ name: 'Parks', params: { kingdomId: playerDetails.KingdomId } }">{{playerDetails.KingdomName}}</router-link></td>
                <th>Park</th>
                <td><router-link :to="{ name: 'Park', params: { parkId: playerDetails.ParkId } }">{{playerDetails.ParkName}}</router-link></td>
              </tr>
            </tbody>
          </table>
        </div>
        <Awards class="col-md-8" :user="playerDetails"></Awards>
      </div>
    </div>
  </div>
</template>

<script>
import Players from '@/services/api/player'
import Parks from '@/services/api/park'
import {mapGetters} from 'vuex'
import Classes from './Class'
import Awards from './Awards'
export default {
  props: ['player'],
  components: {
    Classes: Classes,
    Awards: Awards
  },
  data () {
    return {
      playerDetails: {}
    }
  },
  computed: {
    ...mapGetters({
      token: 'getToken'
    })
  },
  methods: {
    getPlayer () {
      let token = this.token
      let player = {}
      if (!this.player && this.$route.params.playerId) {
        Parks.getParkShort(this.$route.params.parkId).then(resp => {
          player.MundaneId = this.$route.params.playerId
          player.ParkName = resp.data.ParkInfo.ParkName
          player.ParkId = resp.data.ParkInfo.ParkId
          player.KingdomName = resp.data.KingdomInfo.KingdomName
          player.KingdomId = resp.data.KingdomInfo.KingdomId
          Players.getPlayer(player, token).then((resp) => {
            this.playerDetails = Object.assign(player, resp.data.Player)
          })
        })
      } else {
        player = this.player
        Players.getPlayer(player, token).then((resp) => {
          this.playerDetails = Object.assign(player, resp.data.Player)
        })
      }
    }
  },
  watch: {
    player (val) {
      this.getPlayer()
    }
  },
  mounted () {
    this.getPlayer()
  }
}
</script>

<style lang="scss">
.avatar {
  padding: 1em;
}
td {
  text-align: left;
}
</style>
