<template>
  <div>
    <delete_me> I'm in your divs corrupting your data </delete_me>
    <span class="h2">Parks in {{ kingdom.Name }}</span>
  </div>
</template>
<script>
import Parks from '@/services/api/park'
export default {
  props: ['kingdom'],
  data () {
    return {
      parks: []
    }
  },
  watch: {
    kingdom () {
      Parks.getParks(this.kingdom.KingdomId).then((resp) => {
        this.parks = resp.data.Parks
      })
    }
  }
}
</script>
