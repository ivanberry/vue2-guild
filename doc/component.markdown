# Components

## What are Components?

Components are one of the most powerful features of Vue.They help you extend basic HTML elements to encapsulate reusable code.At a high level,components are custom elements that Vue's compiler attaches behavior to.In some cases,they may also appear as a native HTML elements extended with the special `is` attribute.

## Using Components

### Registration

We've learned in the previous sections that we can create a new Vue element with `new Vue()` with some options.To register a global component,we can use `Vue.component(tagName, option)`.

Once registered,a component can be used in an instance's template as a custom element,`<my-component></my-component>`.Make sure the component is registered before you instance the root Vue instance.Here's the full example:

```HTML
<div id="example">
  <my-component></my-component>
</div>
```
```js
// register
Vue.component('my-component',{
  template: '<div>A custom component!</div>'
});

// create a root Vue instance after the component register
new Vue({
  el: '#example'
});
```
Which will render:
```HTML
<div id="example">
  <div>A custom component</div>
</div>
```

### Local Registration

You don't have to register every component globally.You can make a component available only in the scope of another instance/component by registering it with the `components` instance options:

```js
var Child = {
  template: '<div>A custom component</div>'
}

new Vue({
  //..
  components: {
    //<my-component> will only be available in parent's template
    'my-component': Child
  }
});
```
The same encapsulate applies for other registerable Vue features, such as directives.

### DOM Template Parsing Caveats

When using the DOM as your template(e.g. using the `el` option to mount an element with existing content),you will be subject to some restrictions that are inherent to how HTML works,because Vue can only retrieve the template content after the browser has parsed and normalized it.Most notably,some elements such as `ul,ol,table,select` has restrictions on what elements can appear inside them, and some such as `options` can only appear inside certain other elements.

This will lead to issues when using custom components with elements that have such restrictions,for example:

```HTML
<table>
  <my-row></my-row>
</table>
```
The custom component `<my-row>` will be hoisted out as invalid content,thus causing errors in the eventual rendered output.A workaround is to use the `is` special attribute:

```HTML
<table>
  <tr is="my-row"></tr>
</table>
```
It should be noted that these limitations do apply if you are using string templates from one of the following sources:

- `<script type="text/x-template>"`
- JavaScript inline template strings
- `.vue` components
Therefor, perfer using string templates whenever possible.

### `data` Must be a Function

Most of the options that can be passed into the Vue constructor can be used in c component,with one special case `data` must be function.In fact,if you try this:

```HTML
Vue.component('my-component',{
  template: '<span>xx</span>',
  data: {
    message: 'hello'
  }
});
```
Then Vue will halt and emit warnings in the console,telling you that `data` must be a function for component instances.It's good to understand why the rules exit though,so let's cheat.

```HTML
<div id="example">
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
</div>
```
```js
var data = { counter: 0 };
Vue.component('simple-counter', {
  template: '<button @click="counter++">{{ counter }}</button>'
});

new Vue({
  el: '#exmaple'
});
```
Since all three componet instances share the same `data` object,incrementing one counter increments them all!Ouch.Let's fix this by instead returning a fresh data object:

```js
data: function () {
  return {
    counter: 0
  }
}
```
The `el` option also require a function value when used in a component instance, for exactly the same reason.

### Composing Components

Components are meant to used together,most commonly in parent-child relationships:component A may use component B in its own template.They inevitably need to communicate one another:the parent may need to pass data down to the child.However,it is also very important to keep the parent and the child as decoupled as possible via a clearly-defined interface.This ensures each component's code can be written and reasoned about in relative isolation,thus making them more maintainable and potentially easier to reuse.

In Vue.js, the parent-child component relationships can be summarized as **props down, events up**.The parent passes data down to the child via **props**,and the child sends message to the parent via **events**.Let's see how they work next.

![props-down and event-up](http://vuejs.org/images/props-events.png)

## Props

### Passing Data With Props

Every componet instance has its own instance scope.This means you cannot(and should not) directly reference parent data in a child component's template.Data can be passed down to child components via **props**.

A prop is a custom attribute for passing information from parent components.A child component needs to explicitly declare the props it expects to receive using the `props` option:

```js
Vue.component('child', {
  //explicitly declare the props
  props: ['message'],
  //just like the data, the props can be used inside the templates and is also made available in the vm as this.message
  template: '<span>{{ message }}</span>'
})
```

### camelCase vs. kebab-case

HTML attribute are case-insensitive,so when using non-string templates,camelCase prop names need to use kebab-case(hyphen-delimited) equivalents:

```js
Vue.component('child',{
  //camelCase in JavaScript
  props: ['myMessage'],
  template: '<span> {{ myMessage }}</span>'
})
```
```HTML
<!-- kebab-case in HTML -->
<child my-message="hello!"></child>
```
Again,if you're using string template,then this limitation does not apply.

### Dynamic Props

Similar to binding a normal attribute to an expression,we can also use `v-bind` for dynamically binding props to data on the parent.Whenever the data is updated in the parent,it will also flow down to the child:

```HTML
<div>
  <input v-model="parentMsg">
  <br>
  <child :my-message="parentMsg"></child>
<div>
```

### Literal vs Dynamic

A common mistake beginners tend to make is attempting to pass down a number using the literal syntax:
```HTML
<!-- this passes down a plain string '1' -->
<comp some-prop="1"><comp>
```
However,since this is a literal prop,its value is passed down as a plain string `"1"` instead of an actual number.If we want to pass down an actual JavaScript number,we need to use `v-bind` so that its value is evaluated as a JavaScript expression:

```HTML
<!-- this passes down an actual number -->
<comp v-bind:some-prop="1"></comp>
```
### One-Way Data flow

All props form a `one-way-down` binding between the child property and the parent one: when the parent property updates,it will flow down to the child,but not the other way around.This prevents child components from accidentally mutating the parent's state,which can make your app's data flow harder to reason about.

In addition,every time the parent component is updated,all props in the child component will be refreshed with the latest value.This means you should *not* attempt to mutate a prop inside a child component.If you do, Vue will warn you in the console.

There are usually two cases where it's tempting to mutate a prop:

1. The prop is used to only pass in an initial value,the child component simply wants to use it as local data property afterwards;
2. The prop is passed in as a raw value that needs to be transformed.

The proper answer to these use cases are:

1. Define a local data property that uses the prop's initial value as its initial value;
2. Define a computed property that is computed from the prop's value

### Prop Validation

It's possible for a component to special requirements for the props it is reveiving.If a requirement is not met,Vue will emit warnings.This is especially useful when you are authoring a component that is intended to be used by others.

Instead of defining the props as an array of strings,you can use an object with validation requirements:

```js
Vue.component('example',{
  props: {
    //basic type check('null' means accept any type)
    propA: Number,
    //multiple possible types
    propB: [String, Number],
    //a required String
    propC: {
      type: String,
      required: true
    },
    // a number with default value
    propD: {
      type: Number,
      default: 100
    },
    // object/array default should be return from a factory function
    propE: {
      type: Object,
      default: function () {
        return { message: 'hello' }
      }
    },
    // custom validator function
    propF: {
      validator: function (value) {
        return value > 10
      }
    }
  }
})
```
The `type` can be one of the following native constructors:
- String
- Number
- Boolean
- Function
- Object
- Array

In addition, `type` can also be a custom constructor function and the assertion will be made with an `instanceof` check.

When a prop validation fails, Vue will refuse to set the value on the child component and throw a warning if using the development build.

## Custom Events

We have learned that the parent can pass data down to the child using props, but how do we communicate back to the parent when something happens? This is where custom events come in.

### Using `v-on` with Custom Events

Every Vue instance implements `Events interface`,which means it can:
- Listen to an event using `$on(eventName)`
- Trigger an event using `$emit(eventName)`

In addition,a parent component can listen to the event from a child component using `v-on` directly in the template where the child component is used.

**Example in src**

In this example,it's important to note that the child component is still completely decoupled from what happens outside of it.All it does is report information about its own activity,just in case a parent component might care.

Binding Native Events to Components

There may be times when you want to listen for a native event on the root element of a component.In these case,you can use the `.native` modifier for `v-on`.e.g.:

```HTML
<my-component v-on:click.native="doTheThing"></my-component>
```
### Form input Components using Custom Events

This strategy can also be used to create custom form inputs that work with `v-model`. Remember:

```HTML
<input v-model="something">
```
is just syntax sugar for:

```HTML
<input v-bind:value="something" v-on:input="something = $event.target.value">
```
When used with a component,this is simplifies to:

```HTML
<input v-bind:value="something" v-on:input="something = arguments[0]">
```
So far a component to work with `v-model`,it must:

- accept a `value` prop
- emit a `input` event with the new value

This interface can be used not only to connect with form inputs inside a component,but also to easily integrate input types that you invent yourself.Imagine these possibilities:

```HTML
<voice-recognizer v-model="question"></voice-recognizer>
<webcam-gesture-reader v-model="gesture"></webcam-gesture-reader>
<webcam-retianl-scanner v-model="retianlImage"><webcam-retianl-scanner>
```

### Noe P-C communication

Sometimes two components my need to communicate with one-another but they are not parent/child to each other.In simple scenarios,you can use an empty Vue instance as a central event bus:

```js
var bus = new Vue();

// in component A's method
bus.$emit('id-selected',1);

//in component B's created hook
bus.$on('id-selected', function (id) {
  // ...
})
```

## Content Distribution with Slots

When using components,it's often desired to compose them like this:

```HTML
<app>
  <app-header></app-header>
  <app-footer></app-footer>
</app>
```
There are two things to note here:

1. The `app` component does not know what content may be present inside its mount target.It is desired by whatever parent component that using `<app>`.
2. The `<app>` component very likely its own template.

To make the composition work,we need a way to interweave the parent "content" and the component's own template.This is a process called **content distribution**.Vue implements a content distribution API that is modeled after the current Web Component spec draft,using the special `<slot>` element to serve as distribution outlets for the original content.

### Compilation Scope

Before we dig into the API, let's first clarify which scope the contents are compiled in.Image a template like this:

```HTML
<child-component>
  {{ message }}
</child-component>
```
Should the `message` be bound to the parent's data or the child data? The answer is the parent.A simple rule of thumb for component scope is:

>Everything in the parent template is compiled in parent scope;everything in the child template is compiled in child scope.

A common mistake is trying to bind a directive to a child property/method in the parent template:

```HTML
<!-- does NOT work -->
<child-component v-show="someChildProperty"></child-component>
```
