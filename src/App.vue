<template>
<div id="app">
  <header>
    <nav class="navbar nav">
      <span class="navbar-brand">GV Ork</span>
      <ul class="nav navbar-nav">
        <li>
          <router-link to="/kingdoms">Kingdoms</router-link>
        </li>
        <li>
          <router-link to="/parks">Parks</router-link>
        </li>
      </ul>
      <Auth class="navbar-right navbar-form">??</Auth>
    </nav>
    <Alert></Alert>
  </header>
  <main>
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
}

</style>
