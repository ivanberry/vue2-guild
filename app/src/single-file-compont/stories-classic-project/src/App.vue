<template>
<div id="app">
  <img class="logo" src="./assets/logo.png">
  <!-- <hello></hello> -->
  <!-- <login><login> -->
  <!-- <register :stories="stories"></register> -->
  <stories :stories="stories"></stories>
</div>
</template>

<script>
import Hello from './components/Hello';
import Login from './components/Login';
import Register from './components/Register';
import Stories from './components/Stories';

export default {
  data() {
    return {
      stories: [{
        plot: 'My horse is amazing!',
        writer: 'Mr.E',
        upvotes: 44,
        voted: false
      }, {
        plot: 'My girl is pretty!',
        writer: 'Mr.D',
        upvotes: 54,
        voted: false
      }, {
        plot: 'My bed is comfortable',
        writer: 'Mr.G',
        upvotes: 32,
        voted: true
      }, {
        plot: 'My bed is comfortable',
        writer: 'Mr.G',
        upvotes: 12,
        voted: true
      }, {
        plot: 'My bed is comfortable',
        writer: 'Mr.G',
        upvotes: 52,
        voted: true
      },{
        plot: 'Wooh, Vue.js is pretty Cool!',
        writer: 'Mr.Evan You',
        upvotes: 56,
        voted: false
      }]
    }
  },
  components: {
    Hello,
    Login,
    Register,
    Stories
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#app {
  color: #2c3e50;
  margin-top: -100px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
