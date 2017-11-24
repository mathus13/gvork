<template>
  <div>

    <span v-if="kingdom.KingdomInfo" class="h2">Parks in {{ kingdom.KingdomInfo.KingdomName }}</span>
    <div class="row">
      <div class="panel panel-body col-md-3" v-for="park in parks">
        <router-link :to="{ name: 'Park', params: { parkId: park.ParkId }}">The {{ park.Title }} of {{ park.Name }}</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import Parks from '@/services/api/park'
import Kingdoms from '@/services/api/kingdom'

import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      parks: [],
      kingdom: {}
    }
  },
  computed: {
    kId () {
      return (this.$route.params.kingdomId) ? this.$route.params.kingdomId : this.user.KingdomId
    },
    ...mapGetters({
      user: 'getUser'
    })
  },
  watch: {
    kId () {
      console.log('get the kingdom')
      this.getKingdom()
    },
    kingdom () {
      this.getPark()
    }
  },
  methods: {
    getKingdom () {
      return Kingdoms.detail(this.kId).then((resp) => {
        this.kingdom = resp.data
      })
    },
    getPark () {
      if (!this.kingdom.KingdomInfo) return
      return Parks.getParks(this.kingdom.KingdomInfo.KingdomId).then((resp) => {
        this.parks = resp.data.Parks
      })
    }
  },
  mounted () {
    this.getKingdom().then(() => {
      this.getPark()
    })
  }
}
</script>
