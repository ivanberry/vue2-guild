# Event Handling

## Listening to Events

We can use the `v-on` directive to listen DOM events and run some JavaScript when they're triggered.

```HTML
<div id="example1">
  <button @click="counter + 1">Add 1 </button>
  <p>The button above has been clicked {{ counter }}</p>
</div>
```
```js
var example = new Vue({
  el: '#example1',
  data: {
    counter: 0
  }
})
```
## Method Event Handlers

The logic for many event handlers will be more complex though,so keeping your JavaScript in the value for the `v-on` attribute simply isn't feasible.That's why `v-on` can also accept the name of a method you'd like to call.

For example:

```HTML
<div id="methodE">
  <!-- greet it the name of a method defined below -->
  <button type="button" name="button" v-on:click="greet"></button>
</div>
```
```js
var example = new Vue({
  el: '#methodE',
  data: {
    name: 'Vue.js'
  },
  methods: {
    greet: function (event) {
      console.log('Hello ' + event);
    }
  }
});
```
## Methods in inline Handlers

Instead of binding directly to a method name, we can also use methods in an inline JavaScript statement:

```HTML
<div id="methondInLine">
  <button @click="say('h1')"></button>
  <button @click="say('what')"</button>
</div>
```
```js
new Vue({
  el: "#methondInLine",
  methods: {
    say: function (message) {
      console.log(message);
    }
  }
});
```
Sometimes we also need to access the original DOM event in an inline statement handler. We can pass it into a method using the special `$event` variable:

```HTML
<button @click="warn('Form can't be submitted yet:', $event)"></button>
```
```js
methods: {
  warn: function (message, event) {
    //now we can access the original event
    if (event) event.preventDefault()
    console.log(message);
  }
}
```
## Event Modifiers

It's a very common need to call `event.prevnetDefault()` or `event.stopPropagation()` inside event handlers.Although we can do this easily inside methods,it would be better if the methods can be purely about data logic rather than having to deal with DOM event details.

To address this problem,Vue provides **event Modifiers** for `v-on`.Recall that Modifiers are direvtive postfixes denoted by a dot:

- .stop
- .prevent
- .capture
- .self

```HTML
<!-- the click event's propagation will be stopped -->
<a href="#" @click.stop="doThis"></a>

<!-- the submit event will no longer reload the page -->
<form @submit.prevent="submit"></form>

<!-- Modifiers can be chainned -->
<a href="#" @click.stop.prevent="doThat"></a>

<!-- use capture mode when adding the event listener -->
<div @click.capure="doThis"></div>

<!-- only trigger handler if event target is the element itself -->
<div @click.self="doThat"></div>
```

## Key Modifiers

When listening for keyboard events, we often need to check for common key codes, Vue also allows adding key Modifiers for `v-on` when listening for key events:

```HTML
<!-- only call vm.submit() when the keyCode is 13 -->
<input @keyup.13="submint">
```
Remembering all the keyCodes is a hassle, so Vue provides aliases for the most commonly used keys:

```HTML
<input @keyup.enter="submit">
```
Here's the full list of key modifiers aliases:
- enter
- tab
- delete (including Delete and backspace)
- esc
- space
- up
- down
- left
- right

Single letter, you can even define custom key modifier aliases:

```js
Vue.config.keyCodes.f1 = 112;
```
## Why Listeners in HTML?

You might be concerned that this whole event listening approach violates the good old rules about "seperation of concerns".Rest assured-since all Vue handler functions and expressions are strictly bound to the ViewModel that's handling the current view,it won't cause any maintenance difficultly. In fact,there are several benefits in using `v-on`:

1. It's easier to locate the handler function implementations within hour JS code by simply skimming the HTML template.
2. Since you don't have to manually attach event listeners in JS,your ViewModel code can be pure logic and DOM-free.This makes it easier to test.
3. When a ViewModel is destroyed,all event listeners are automatically removed.You don't need to worry about cleaning it up yourself.

# Form Input Bindings

## Basic Usage

You can use the `v-model` directive to create two-way data bindings on form input and textarea elements.It automatically picks the correct way to update the element based on the input type.Although a bit magical,`v-model` essentially syntax sugar for updating data on user input events,plus special care for some edge cases.

**Note**:`v-model` doesn't care about the initial value provided to an input or a textarea.It will always treat the Vue instance data as the source of truth.

### Text

```HTML
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>
```
### Multiple text

```HTML
<span>Multiple message is:</span>
<p>{{ message }}</p>
<textarea v-model="message" placeholder="add multiple lines"></textarea>
```
### Checkbox

Single checkbox boolean value:

```HTML
<input type="checkbox" id="checkbox" v-model="checked">
<label for="checkbox">{{ checked }}</label>
```
## Radio

```HTML
<input type="radio" name="name" value="One" id="one" v-model="picked">
<label for="one">One</label>
<input type="button" name="name" value="Two" id="two" v-model="picked">
<label for="two">Two</label>
<br>
<span>Picked: {{ picked }}</span>
```
## Select

Single select:

```HTML
<select class="" name="" v-model="selected">
  <option>A</option>
  <option>B</option>
  <option>C</option>
  <option>D</option>
</select>
<span>Selected: {{ selected }}</span>
```
Dynamic options rendered with `v-for`:

```HTML
<select class="" name="" v-model="selected">
  <option v-for="option in options" :value="option.value">
    {{ option.value }}  
  </option>
</select>
```
```js
new Vue({
  el: '..',
  data: {
    selected: 'A',
    options: [
      { text: 'One', Value: 'A'},
      { text: 'Two', Value: 'C'},
      { text: 'Three', Value: 'B'}
    ]
  }
});
```
## Value Bindings

For radio, checkbox and select options, the `v-model` binding values are usually static strings(or booleans for checkbox):

```HTML
<!-- `picked` is a string "a" when picked -->
<input type="radio" value="a" v-model="picked">

<!-- 'toggle' is either true or false -->
<input type="checkbox" v-model="toggle">

<!-- 'selected' is a string "abc" when selected -->
<select v-model="selected" class="" name="">
  <option value="abc">ABC</option>  
</select>
```

But sometimes we may want to be bind the value to a dynamic property on the Vue instance.We can use `v-bind` to achieve that.In addition,using `v-bind` allows us to bind the input value to non-string values.

### Checkbox

```HTML
<input
  type="checkbox"
  v-model="toggle"
  v-bind:true-value="a"
  v-bind:false0-value="b"
  >
```
```js
//when checked
vm.toggle === vm.a

//when unchecked
vm.toggle === vm.b
```

### Radio

```HTML
<input type="radio" name="name" value="" v-model="pick" :value="a">
```
```js
//when checked
vm.pick === vm.a
```
### Select options

```HTML
<select class="" name="" v-model="selected">
<!-- inline object literate -->
  <option :value="{ number: 123 }">123</option>
</select>
```
```js
typeof vm.selected === 'object';
vm.selected.number === 123
```

### Modifiers

# #.lazy

By default, `v-model` syncs the input with the data after each `input` event. You can add the `lazy` modifier to instead sync after `change` events:

```HTML
<input type="button" name="name" value="" v-model.lazy="msg">
```

# #.number

If you want user input to be automatically typecase as a number,you can add the `number` modifier to your `v-model` managed inputs:

```HTML
<input v-model.number="age" type="number">
```
This is often useful,because even with `type="number"`,the value of HTML input elements always returns a string.

# #.trim

If you want user input to be trimmed automatically, you can add the `trim` modifier to your `v-model` managed inputs:

```HTML
<input v-model.trim="msg"
```







**Note**: all of above need initial with `new Vue()`.
