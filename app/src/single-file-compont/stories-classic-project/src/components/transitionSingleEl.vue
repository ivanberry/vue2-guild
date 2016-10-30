<template lang="html">
  <div id="demo">
    <button @click="show = !show">Toggle</button>
    <transition>
      <p v-show="show">hello</p>
    </transition>

    <!-- <transition name="bounce">
      <p v-show="show"> Look at me! </p>
    </transition>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated tada"
      leave-active-class="animated bounceOutRight"
     >
     <p v-if="show">Aniamtion CSS library included</p>
    </transition>
 -->
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
      :css="false"
    >
      <p v-if="show">Velocity aniamtions</p>
    </transition>

  </div>
</template>

<script>
export default {
  data () {
    return {
      show: true
    }
  },
  computed: {},
  mounted () {},
  methods: {
    beforeEnter: function (el) {
      el.style.opacity = 0;
    },
    enter: function (el, done) {
      Velocity(el, {opacity:1, fontSize: '1.4em'}, {duration: 300});
      Velocity(el, {fontSize: '1em'}, {complete: done})
    },
    leave: function (el, done) {
      Velocity(el, { translateX: '15px', rotateZ: '50deg'}, {duration: 600});
      Velocity(el, {rotateZ: '100deg'}, {loop: 2});
      Velocity(el, {
        rotateZ: '45deg',
        translateY: '30px',
        translateX: '30px',
        opacity: 0
      }, {complete: done})
    }
  },
  components: {}
}
</script>

<style lang="css">

.slide-fade-enter-active {
  transition: all 3s ease;
}

.slide-fade-leave-active {
  transition: all 2s ease-in-out;
}

.slide-fade-enter,
.slide-fade-leave-active {
  font-size: 30px;
  color: orange;
  opacity: 0;
  padding-left: 10px;
}

.bounce-enter-active {
  animation: bounce-in .5s;
}

.bounce-leave-active {
  animation: bounce-out .5s;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    tranform: scale(1);
  }
}

@keyframes bounce-out {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(0);
  }

}


</style>
