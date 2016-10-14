<template>
  <div class="container">
    <header>
      <slot name="slot"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script type="text/javascript">
export default {
  data () {
    return {
      msg: ''
    }
  }
}
</script>
