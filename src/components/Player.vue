<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <span class="h2">{{ playerDetails.Persona }}</span>
    </div>
    <div class="panel-body">
      <div class="col-md-3">
        <div class="avatar">
          <img :src="'https:' + playerDetails.Image" alt="Player image" class="img-responsive img-rounded">
        </div>
        <div class="avatar">
          <img :src="'https:' + playerDetails.Heraldry" alt="Player heraldry" class="img-responsive img-rounded">
        </div>
      </div>
      <div class="col-md-9">
        <dl class="dl dl-horizontal">
          <dt>Player</dt>
          <dd>{{ (playerDetails.GivenName) ? playerDetails.GivenName + ' ' + playerDetails.Surname : ''}}</dd>
          <dt>Persona</dt>
          <dd>{{ playerDetails.Persona }}</dd>
          <dt>Username</dt>
          <dd>{{ playerDetails.UserName }}</dd>
          <dt>Email</dt>
          <dd><a :href="'mailto:' + playerDetails.Email">{{ playerDetails.Email }}</a></dd>
          <dt>Kingdom</dt>
          <dd><router-link :to="{ name: 'Parks', params: { kingdomId: playerDetails.KingdomId } }">{{playerDetails.KingdomName}}</router-link></dd>
          <dt>Park</dt>
          <dd><router-link :to="{ name: 'Park', params: { parkId: playerDetails.ParkId } }">{{playerDetails.ParkName}}</router-link></dd>
        </dl>
      </div>
      <Classes class="col-md-4" :player="playerDetails"></Classes>
    </div>
  </div>
</template>

<script>
import Players from '@/services/api/player'
import Parks from '@/services/api/park'
import {mapGetters} from 'vuex'
import Classes from './Class'
export default {
  props: ['player'],
  components: {
    Classes: Classes
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
        Parks.getPark(this.$route.params.parkId).then(resp => {
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
</style>
