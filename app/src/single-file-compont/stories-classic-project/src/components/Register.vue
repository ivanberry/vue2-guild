<template>
  <div class="register">
    <h1>Register Form</h1>
    <input placeholder="First Name">
    <input placeholder="Last Name">
    <input placeholder="Email address" type="email">
    <input placeholder="Pick a password" type="password">
    <button type="button" name="button">Sign Up</button>
    <famous :stories="stories"></famous>
  </div>
</template>

<script type="text/javascript">
import Famous from './Famous.vue';

export default {
  data () {
    return {
      stories: ''
    }
  },
  components: {
    Famous,
  },
  beforeCreate () {
    console.log('beforeCreate: ' + new Date());
  },
  created () {
    console.log('instance created: ' + new Date());
  },
  // props: ['stories']
}
</script>
