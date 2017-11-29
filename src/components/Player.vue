<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <span class="h2">{{ player.Persona }}</span>
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
          <dd>{{ playerDetails.KingdomName }}</dd>
          <dt>Park</dt>
          <dd>{{ playerDetails.ParkName }}</dd>
        </dl>
      </div>
      <Classes class="col-md-4" :player="player"></Classes>
    </div>
  </div>
</template>

<script>
import Players from '@/services/api/player'
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
      Players.getPlayer(this.player, token).then((resp) => {
        this.playerDetails = Object.assign(this.player, resp.data.Player)
      })
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
