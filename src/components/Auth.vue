<template>
<div id="auth">
  <div v-if="user">Welcome {{user.name}} </div>
  <div v-else class="form form-horizontal">
    <div class="form-group">
      <label for="username" class="sr-only">Username</label>
      <input id="username" class="form-control" v-model="username" placeholder="username" />
    </div>
    <div class="form-group">
      <label for="password" class="sr-only">Password</label>
      <input id="password" class="form-control" v-model="password" />
    </div>
    <div class="form-group">
      <button type="button" name="Login" class="btn btn-primary btn-xs" @click="login"></button>
    </div>
  </div>
</div>
</template>

<script>
import {
  mapGetters
} from 'vuex'

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
      this.$store.dispatch('login', {
        user: this.username,
        pass: this.password
      }).then((resp) => {

      })
    }
  }
}
</script>

<style>

</style>
