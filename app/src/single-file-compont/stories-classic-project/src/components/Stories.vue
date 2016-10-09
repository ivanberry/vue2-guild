<template>
<div class="container">
  <h1 class="headline">Did you know this?</h1>
  <ul class="list-group">
    <li class="list-group-item" v-for="story in stories">
      {{ story.writer }} said "{{ story.plot }}" Story upvotes {{ story.upvotes }}
    </li>
  </ul>
</div>
</template>

<script>
export default {
  props: ['stories']
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
