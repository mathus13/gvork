<template>
  <div class="hello container">
    <playerSearch class="col-md-6"></playerSearch>
  </div>
</template>

<script>
import PlayerSearch from './SearchPlayers'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js PWA'
    }
  },
  components: {
    playerSearch: PlayerSearch
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
