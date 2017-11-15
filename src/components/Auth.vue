<template>
<div id="auth">
  <div v-if="user.id">Welcome {{user.name}} </div>
  <div v-else>
    <div class="form-group">
      <label for="username" class="sr-only">Username</label>
      <input id="username" class="form-control" v-model="username" placeholder="username" />
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
import PubSub from 'pubsub-js'
export default {
  data () {
    return {
      username: null,
      password: null
    }
  },
  computed: {
    // user: this.$store.getUser()
    ...mapGetters({
      user: 'getUser'
    })
  },
  methods: {
    login () {
      this.$store.dispatch('authenticate', {
        user: this.username,
        pass: this.password
      }).then((resp) => {
        PubSub.publish('session.user.auth', resp.data)
      })
    }
  },
  mounted () {
    console.log(this.$store)
  }
}
</script>

<style>

</style>
