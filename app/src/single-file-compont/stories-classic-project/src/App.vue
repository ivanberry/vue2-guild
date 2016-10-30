<template>
<div id="app">
  <!-- <img class="logo" src="./assets/logo.png"> -->
  <h2>Welcome to dynamic components!</h2>
  <!-- <tran></tran> -->
  <stories></stories>
  <!-- <ul class="nav nav-tabs"> -->
    <!-- <li v-for="page in pages" :class="{active: isActivePage(page)}"> -->
      <!-- <a href="#" @click="setPage(page)">{{ page | capitalize }}</a> -->
    <!-- </li> -->
  <!-- </ul> -->
  <!-- <component :is="activePage"></component> -->
</div>
</template>

<script>
// import Hello from './components/Hello';
// import Login from './components/Login';
// import Register from './components/Register';
import Stories from './components/Stories';
// import Greet from './components/Greet';
 // import Slotd from './components/Slotd';
 // import Tran from './components/transitionSingleEl'

export default {
  data() {
    return {
      // the page we want to render each time
      pages: [
        'stories',
        'register',
        'login'
      ],
      activePage: 'login',
      currentComponent: 'greet',
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
    // Slotd
    // Hello,
    // Greet,
    // Login,
    // Register,
    Stories,
    // Tran
  },
  methods: {
    setPage (newPage) {
      console.log(newPage);
      this.activePage = newPage;
    },
    isActivePage (page) {
      return this.activePage === page;
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
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
