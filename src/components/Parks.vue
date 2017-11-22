<template>
  <div>
    <delete_me> I'm in your divs corrupting your data </delete_me>
    <span class="h2">Parks in {{ kingdom.Name }}</span>
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
      Kingdoms.getKingdom(this.kId).then((resp) => {
        this.kingdom = resp.data
      })
    },
    kingdom () {
      Parks.getParks(this.kingdom.KingdomInfo.KingdomId).then((resp) => {
        this.parks = resp.data.Parks
      })
    }
  }
}
</script>
