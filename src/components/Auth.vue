<template>
<div id="auth">
  <div v-if="user.UserId" class="navitar">
    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
      <img class="img-responsive img-circle" :src="'https:' + user.Image" :alt="'Welcome ' + user.Persona">
    </a>
    <ul class="dropdown-menu">
      <li><router-link :to="{ name: 'Player', params: { parkId: user.ParkId, playerId: user.MundaneId }}">Me</router-link></li>
      <li><router-link :to="{ name: 'Park', params: {parkId: user.ParkId}}">My Park</router-link></li>
      <li><router-link :to="{ name: 'Parks', params: {kingdomId: user.KingdomId}}">My Kingdom</router-link></li>
      <li><a href="#" @click="logout">logout</a></li>
    </ul>
  </div>
  <div v-else>
    <div class="form-group">
      <label for="username" class="sr-only">Username</label>
      <input name="username" class="form-control" v-model="username" placeholder="username" />
    </div>
    <div class="form-group">
      <label for="password" class="sr-only">Password</label>
      <input id="password" type="password" class="form-control" v-model="password" />
    </div>
    <div class="form-group">
      <button type="button" name="Login" class="btn btn-primary btn-md" @click="login">Login</button>
    </div>
  </div>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      username: null,
      password: null
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  },
  methods: {
    login () {
      this.$store.dispatch('authenticate', {
        user: this.username,
        pass: this.password
      })
    },
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style>
  .navitar {
    width: 35px;
  }
</style>
