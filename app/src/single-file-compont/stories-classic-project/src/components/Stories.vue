<template>
<div class="container">
  <h1 class="headline">Did you know this?</h1>
  <button @click="add">add</button>
  <button @click="remove">remove</button>
    <transition-group name="list" tag="ul" class="list-group" >
      <li class="list-group-item" v-for="story in stories" @key="story" key="story">
        {{ story.writer }} said "{{ story.plot }}" Story upvotes {{ story.upvotes }}
      </li>
    </transiton-group>
</div>
</template>

<script>
import { store } from '../store.js';

export default {
  data() {
    return {
      show: true,
      stories: store.stories
    }
  },
  methods: {
    add: function () {

    },
    remove: function () {
      this.stories.shift();
    }
  }
}
</script>

<style lang="css">
.headline {
  color: lightblue;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-active {
  opacity: 0;
  transfom: translateY(30px);
}
</style>
