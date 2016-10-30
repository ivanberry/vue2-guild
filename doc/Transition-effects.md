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
When an element wrapped in a `transition` component is inserted or removed, this is what happens:

1. Vue will automatically sniff whether the target element has CSS transitions or animations appled. If it does, CSS transition classes will be added/removed at appropriate timings.
2. If the transition component provided JavaScript hooks, these hooks will be called at appropriate timings.
3. If no CSS transitions/animations are detected and no JavaScript hooks are provided, the DOM operations for insertion and/or removal will be excuted immediately  on next frame.

###  Transition Classes

There are four classes applied for enter/leave transitions.

1. `v-enter`: Starting state for enter. Applied before element is inserted,removed after one frame.
2. `v-enter-active`: Active and ending state for enter.Applied before element is inserted,removed when transition/animation finishes.
3. `v-leave`: Starting state for leave.Applied when leaving transition is triggered, removed after one frame.
4. `v-leave-active`: Active and ending state for leave. Applied when leave transition is triggered, removed when the transition/animation finishes.

![transition class](http://vuejs.org/images/transition.png)

Each of these classes will be prefixed with the name of the transition. Here the `v-` prefix is the default when you use a `<transition>` element with no name.If you use `<transition name="my-transition">` for example, then the `v-enter` class would instead be `my-transition-enter`.

### CSS transitions

One of the most common transition types  uses CSS transitions. Here's a simple example(例子详见transitionSingleEl.vue)

### CSS Aniamtions

CSS animations are applied in the same way as CSS transitions, the difference being that `v-enter` is not removed immediately after the element is inserted, but on an `animationend` event.

### Custom Transition Classes

You can also specify custom transition classes by providing the following attributes:

- `enter-class`
- `enter-active-class`
- `leave-class`
- `leave-active-class`

These will override the conventional class names. This is especially useful when you want to combine Vue's transition system with existing CSS animation library like **Aniamtion.css**.  

### Using Transitions and Animations Together

VUe needs to attach event listeners in order to know when a transitions has ended. It can either be `transitionend` or `animationend`, depending on the type of CSS rules applied. If you are only using one or the other,Vue can automatically detect the corrent type.

However, in some cases you may want to have both on the same element, for example having a CSS animation triggered by Vue, along with a CSS transition effect on hover. In these cases, you will have to explicitly declare the type you want the Vue to care about in a `type` attribute, with a value of either `aniamtion` or `transition`.

### JavaScript Hooks

You can also define JavaScript hooks in attributes:

```HTML
<transition
  @before-enter="beforeEnter"
  @enter="enter"
  @after-enter="afterEnter"
  @enter-cancelled="afterCancelled"

  @before-leave="beforeLeave"
  @leave="leave"
  @after-leave="afterLeave"
  @leave-cancelled="leaveCancelled"
>

</transition>

```js
methods: {
  //ENTERING
  beforeEnter: function (el) {
    //...
  },
  // the done callback is optional when used in combination with css
  enter: function (el, done) {
    //
    done();
  },
  afterEnter: function (el) {
    //..
  },
  enterCancelled: function (el) {
    //..
  }

  //LEAVING
  beforeLeave: function (el) {
    //..
  },  
  // the done callback is optional when used in combination with css
  leave: function (el, done) {
    //..
    done();
  },
  afterLeave: function (el) {
    //.
  },
  leaveCancelled: function (el) {
    //...
  }
}
```
These hooks can be used in combination with CSS transitions/animations or on their own.

**NOTE**: when using JavaScript transitions, the `done` callbacks are required for `endter` and `leave` hooks. Otherwise, they will be called synchronously and the transition will finish immediately. It's also a good idea to explicitly add `v-bind:css="false"` for JavaScript-only transition so that Vue can skip the CSS detection. This also prevents CSS rules from accidenttly interfering with the transition.

### Transitions on Initial Render
If you also want to apply a transition on the initial render of a node,you can add the `appear` attribute.

```HTML
<transition appear></transition>
```
By default,this will use the transitions specified for entering and leaving.If you'd like however, you can also specify custom CSS classes.

```HTML
<transition
  appear
  appear-class="custom-appear-class"
  appear-active="custom-appear-active-class">
</transition>
```

and custom JavaScript hooks:

```HTML
<transition
  appear
  @before-appear="customBeforeAppearHook"
  @appear="customAppearHook"
  @after-appear="customAfterHook">
</transition>
```

### Transitioning Between Elements

We discuss *transitioning between components* later,but you can also transition between raw elements using `v-if`/`v-else`, One of the most common two-element transitions is between a list container and a message describing an empty list.

```HTML
<transition>
  <table v-if="items.length > 0">
    <!-- < -->
  </table>
  <p v-else>Sorry, no items found</p>
</transition>
```
This works well, but there's one caveat to be aware of.

**NOTE**: When toggle between elements that have the **the same tag name**,you must tell Vue that they are distinct elements by giving them unique `key` attributes.Otherwise, Vue's compiler will only replace the content of the element efficiency.Even, when technically unnecessary though, **it's considered good practice to always key multiple items within a <transition> component**.

```HTML
<transition>
  <button v-if="isEditing" key="save">
    save
  </button>
  <button v-else key="edit">
    edit
  </button>
</transition>
```
In these cases,you can also use the `key` attribute to transition between different states of the same element. instead of using `v-if`/`v-else`, the above example could be rewritten as:

```HTML
<transition>
  <button @key="isEditing">
    {{ isEditing ? 'save' : 'edit'}}
  </button>
</transition>
```
It's actually possible to transition between any number of elements,either by using multiple `v-if`s or binding a single element to a dynamic property. For example:

```HTML
<transition>
  <button v-if="docState === 'saved'" key="saved">
    Edit
  </button>
  <button v-if="docState === 'edited'" key="edited">
    Save
  </button>
  <button v-if="docState === editing" key="editing">
    Cancel
  </button>
</transition>
```
Which could also be rewritten as:

```HTML
<transition>
  <button @key="docState">
    {{ buttonMessage }}
  </button>
</transition>
```
```js
//...
computed: {
  buttonMessage: function () {
    switch (docState) {
      case 'saved': return 'Edit'
      case 'editing': return 'Save'
      case 'editing': return 'Cancel'
    }
  }
}
```
### Transition Modes
There's still one problem though, As it's transitioning between the "on" button and the "off" button, both buttons are rendered-one transitioning out while the other transitioning in. This is the default behavior of `<transition>` -entering and leaving happens simultaneously.

Sometimes this work great,like when transitioning items are absolutely positioned on top of each other.Or even like slide transition.

simultaneous entering and leaving transition aren't always desirable though, so Vue offers some alternative transition modes:

- `in-out`: New element transition in first, then when complete, the current transitions out.
- `out-in`: Current element transitions out first,then when complete, the new transitions in.

The `in-out` mode isn't used as often, but can somtimes be useful for slightly different transition effect.

### Transition Between Components

Transitioning between components is even simpler-we don't even need the `key` attribute.Instead, we just wrap a dynamic component:

```HTML
<transition name="component-fade" mode="out-in">
  <component @is="view"></component>
</transition>
```
```js
new Vue({
  el: '',
  data: {
    view: 'v-a'
  },
  components: {
    'v-a': {
      template: '<div>component A</div>'
    },
    'v-b': {
      template: '<div>component B</div>'
    }
  }
})
```
```css
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity .3s ease;
}

.component-fade-enter,
.component-fade-leave {
  opacity: 0;
}
```

### List Transitions

So far, we've managed transitions for:
- Individual nodes
- Multiple nodes where only 1 is render at a time

So what about for when we have a whole list of items we want to render simultaneously,for example with `v-for`? In this case,we'll use the `<transition-group>` component. Before we dive into an example though, there are a few things that are important to know about this component:

- Unlike `<transition>`, it renders an actual element: a `<span>` by default. You can change the element that's rendered with 'tag' attribute.
- Elements inside are **always required** to have a unique `key` attribute.

### List Entering/Leaving Transition

Now let's dive into a simple example,transition entering and leaving using the same CSS classes we've used previously.
