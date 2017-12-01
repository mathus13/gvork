<template>
<div id="app">
  <header>
    <nav class="navbar navbar-default">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#nav-links" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
        </button>
        <router-link :to="{ name: 'Hello' }" class="navbar-brand">GV Ork</router-link>
      </div>
      <div class="collapse navbar-collapse" id="nav-links">
        <ul class="nav navbar-nav">
          <li>
            <router-link to="/kingdoms">Kingdoms</router-link>
          </li>
          <li>
            <router-link to="/parks">Parks</router-link>
          </li>
        </ul>
        <Auth class="navbar-right navbar-form">??</Auth>
      </div>
    </nav>
    <Alert></Alert>
  </header>
  <main class="container">
    <router-view></router-view>
  </main>
</div>
</template>

<script>
import Auth from './components/Auth'
import Alert from './components/Alert'

export default {
  name: 'app',
  components: {
    Auth: Auth,
    Alert: Alert
  },
  mounted () {
    let timeout = new Date(localStorage.getItem('timeout'))
    let now = new Date()
    if (timeout > now) {
      this.$store.commit('SET_USER', JSON.parse(localStorage.getItem('user')))
      this.$store.commit('SET_AUTH', JSON.parse(localStorage.getItem('authorizations')))
      this.$store.commit('SET_TOKEN', localStorage.getItem('token'))
      this.$store.commit('SET_TIMEOUT', timeout.toString())
    }
  }
}
</script>

<style lang="scss">
$icon-font-path: "../../node_modules/bootstrap-sass/assets/fonts/bootstrap/";
body {
    margin: 0;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

.navbar-default {
  background-color: none;
}

main {
    text-align: center;
    margin-top: 40px;
}

header {
    margin: 0;
    height: 56px;
    padding: 0 16px 0 24px;
    background-color: #35495E;
    color: #ffffff;
    span {
      display: block;
      position: relative;
      font-size: 20px;
      line-height: 1;
      letter-spacing: 0.02em;
      font-weight: 400;
      box-sizing: border-box;
      padding-top: 16px;
    }
    nav a{
      color: #fff;
    }
    .navbar-default {
      background-color: inherit;
      border: 0;
      color: #f5f5f5;
      .navbar-brand {
        color: #fff;
      }
      .navbar-nav {
        li {
          a {
            color: #f5f5f5;
          }
        }
      }
    }
    #nav-links {
      z-index: 90000;
    }
}

</style>
