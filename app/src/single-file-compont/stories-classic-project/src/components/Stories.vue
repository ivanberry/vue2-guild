<template>
<div class="container">
  <h1 class="headline">Did you know this?</h1>
  <ul class="list-group">
    <li class="list-group-item" v-for="story in store.stories">
      {{ story.writer }} said "{{ story.plot }}" Story upvotes {{ story.upvotes }}
    </li>
  </ul>
</div>
</template>

<script>
import {store} from '../store.js';

export default {
    data () {
      return {
        store
      }
    }
}
</script>

<style lang="css">
.headline {
  color: lightblue;
}
</style>
