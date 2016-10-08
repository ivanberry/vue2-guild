<template>
  <div class="login">
    <h2>Sign In</h2>
    <input type="email" placeholder="Email address" class="form-control">
    <input type="password" placeholder="Password" class="form-control">
    <button type="button" name="button" class="btn">Sign In</button>
  </div>
  </template>

<script type="text/javascript">
export default {
  created () {
    console.log('login');
  }
}
</script>
