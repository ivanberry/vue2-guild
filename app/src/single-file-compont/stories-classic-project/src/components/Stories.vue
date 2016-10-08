<template>
  <div class="container">
    <h1 class="headline">Did you know this?</h1>
    <ul class="list-group">
      <li class="list-group-item" v-for="story in stories">
        {{ story.writer }} said "{{ story.plot }}"
        Story upvotes {{ story.upvotes }}
      </li>
    </ul>
  </div>
  </template>

<script>
export default {
  data () {
    return {
      stories: [
        {
          plot: 'My horse is amazing!',
          writer: 'Mr.Ivan',
          upvotes: 12,
          voted: false
        },
        {
          plot: 'Your girl is pretty cute!',
          writer: 'Miss.shirting',
          upvotes: 20,
          voted: false
        },
        {
          plot: 'Wooh, Vue.js is Cool!',
          writer: 'Mr.Evan You',
          upvotes: 39,
          voted: false
        }
      ]
    }
  },
  // computed: {},
  // ready () {},
  // attached () {},
  // methods: {},
  // components: {}
}
</script>

<style lang="css">
.headline {
  color: lightblue;
}
</style>
