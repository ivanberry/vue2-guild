# Transition Effects

## Overview

Vue provides a variety of ways to apply transition effects when items are inserted, updated, or removed from the DOM. This include tools to:

- automatically apply classes for CSS transition and aniations
- integrate 3rd-party CSS animation libraries, such as Animation.CSS
- use JavaScript to directly manipulate the DOM during transition hooks
- integrate 3rd-party JavaScript animation libraries, such as Velocity.js

Oh this page, we'll only cover entering, leaving, and list transition, but you can see next section for **managing state transition**.

## Transition Single Elements/Components

Vue provide a `transtion` wrapper component, allowing you to add entering/leaving transition for any element of component in the fllowing context:

- Conditional rendering (using `v-if`)
- Conditional display (using `v-show`)
- Dynamic components
- Component root nodes

This is what a very simple example looks like in action:

```HTML
<div id="#demo">
  <button @click="show = !show">
    Toggle
  <button>
  <transition name = "fade">
    <p v-if="show">hello</p>
  <transition>
</div>
```
```js
new Vue({
  el: '#demo',
  data: {
    show: true
  }
})
```

```CSS
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
```
