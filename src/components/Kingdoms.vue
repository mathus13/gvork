<template>
<div>
  <div class="panel panel-body col-md-3" v-for="kd in kingdoms">
    <router-link :to="{ name: 'Parks', params: {kingdomId: kd.KingdomId}}">{{ kd.KingdomId }}: {{ kd.KingdomName }}</router-link>
  </div>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters({
      kingdoms: 'getKingdoms'
    })
  },
  mounted () {
    this.$store.dispatch('getKingdoms')
  }
}
</script>
<style>

</style>
