<template>
<div class="search">
  <div class="form-group">
    <input type="search" class="form-control" @keyup="query" v-model="term">
  </div>
  <div class="list-group">
    <div class="list-group-item" v-for="player in players">
      <h6>{{player.Persona}}</h6>
      <span>{{player.KingdomName}}:: {{player.ParkName}}</span>
    </div>
  </div>
</div>
</template>

<script>
import search from '../services/api/search'
export default {
  data () {
    return {
      players: [],
      term: []
    }
  },
  methods: {
    query () {
      search.players({
        search: this.term
      }).then((resp) => {
        if (resp.data.Success === false) {

        } else {
          this.players = resp.data
        }
      })
    }
  }
}
</script>

<style>

</style>
