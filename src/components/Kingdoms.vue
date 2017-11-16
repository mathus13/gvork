<template>
<div>
  <div class="panel panel-body col-md-3" v-for="kd in kingdoms">
    {{ kd.KingdomName }}
  </div>
</div>
</template>

<script>
import PubSub from 'pubsub-js'
import kingdomApi from '@/services/api/kingdom'
export default {
  data () {
    return {
      kingdoms: []
    }
  },
  mounted () {
    kingdomApi.fetch()
    PubSub.subscribe('kingdoms.loaded', (topic, resp) => {
      this.kingdoms = resp
    })
  }
}
</script>

<style>

</style>
