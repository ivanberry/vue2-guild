<template>
  <div class="register">
    <h1>Register Form</h1>
    <input placeholder="First Name">
    <input placeholder="Last Name">
    <input placeholder="Email address" type="email">
    <input placeholder="Pick a password" type="password">
    <button type="button" name="button">Sign Up</button>
  </div>
</template>

<script type="text/javascript">
export default {
  beforeCreate () {
    console.log('beforeCreate@');
  },
  created () {
    console.log('instance created');
  }
}
</script>
